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
  
  function updateSpots(id, increment) {
    const days = [ ...state.days ]
    console.log(days);

    const foundDays = days.find(day => day.appointments.includes(id));
    if (increment === 'sub') {
      foundDays.spots -= 1;
      return foundDays;
    }
    // return foundDays.spots += 1;
    return days;
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

    const spotsCount = updateSpots(id);

      return axios.delete(`http://localhost:8001/api/appointments/${id}`)
        .then(() => setState({ ...state, appointments, spotsCount }))
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

    updateSpots(id, "sub");

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(() => setState({ ...state, appointments }))
  }

  

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}