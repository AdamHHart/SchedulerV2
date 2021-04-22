import {useState, useEffect} from "react"
import axios from "axios"


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState(prev => ({ ...prev, day: day }));

  useEffect(() => {
    const daysPromise = axios.get(`http://localhost:8001/api/days`);
    const appointmentPromise = axios.get(`http://localhost:8001/api/appointments`);
    const interviewersPromise = axios.get(`http://localhost:8001/api/interviewers`);
    const promises = [daysPromise, appointmentPromise, interviewersPromise];
  
    Promise.all(promises)
      .then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })
  }, [])

  // passing newDaysObj into set state when booking, cancelling, and editing
  const getSpotsForDay = function (dayObj, appointments) {

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    }
    return spots;
  }

  //return number of spots for a day
  function updateSpots(dayName, days, appointments) {

    //find the day Object
    const dayObj = days.find(day => day.name === dayName);

    //calculate spot for this day
    const spots = getSpotsForDay(dayObj, appointments);
    return days.map(day => day.name === dayName ? { ...day, spots} : day);
  }


  function cancelInterview(id) {

    const nullInterview = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: nullInterview
    }

      return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days: updateSpots(state.day, state.days, appointments)}))
      // .catch(error => console.error(error));
  }

  // HAVE TO ADD INTERVIEWER TO IF STATEMENT WHEN INTERVIEWERS IS RENDERED
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => setState({ ...state, appointments, days: updateSpots(state.day, state.days, appointments)}))
    // .catch(error => console.error(error));
  }
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}