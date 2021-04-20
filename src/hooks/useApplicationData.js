import {useState, useEffect} from "react"
import axios from "axios"


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
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
        // console.log("props.interviews all[2].data =", all[2].data)
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}))
      })
  }, [])


  // // NEW ATTEMPT AT EDIT APPOINTMENT TO UPDATE SPOTS
  // // get spots for day (Code from Gary)
  // const getSpotsForDay = function(dayObj, appointments) {
  //   let spots = 0;
  //   for (const id of dayObj.appointments) {
  //     const appointment = appointments[id];
  //     if (!appointment) {
  //       spots ++;
  //     }
  //   }
  //   return spots;
  // }

  // // calculate updated spots number (Code from Devin M.)
  // const newSpotDayObj = (dayName, days, appointments) => {
  //   const dayToUpdate = days.find(day => day.name === dayName);
  //   let spotCount = 0; 
  //   for(let app in appointments) {
  //     if(appointments[app].interview === null && dayToUpdate.appointments.includes(appointments[app].id)) {
  //       spotCount++
  //     }
  //   }
  //   return {...dayToUpdate, spots: spotCount};
  // };

  // // build newDaysObj with the updated spots
  // const newDaysArr = (dayObj, daysArr) => {
  //   return daysArr.map((day) => (day.name === dayObj.name ? dayObj:day));
  // };

  // // passing newDaysObj into set state when booking, cancelling, and editing
  const getSpotsForDay = function (dayObj, appointments) {

    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      console.log('appointment.interview', appointment.interview)
      if (!appointment.interview) {
        spots++;
      }
    }
    console.log('spots', spots)
    console.log('dayObj', dayObj)
    return spots;
  }

  //return number of spots for a day
  function updateSpots(dayName, days, appointments) {

    //find the day Object
    const dayObj = days.find(day => day.name === dayName);

    //calculate spot for this day
    const spots = getSpotsForDay(dayObj, appointments);
    console.log('return', days.map(day => day.name === dayName ? { ...dayObj, spots} : day))
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