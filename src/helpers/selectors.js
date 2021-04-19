export function getAppointmentsForDay(state, day) {
  let appointmentsArray = [];
  if (state.days.length === 0) {
    return appointmentsArray;
  }
  state.days.map((obj) => {
    if (obj.name === day) {
      appointmentsArray.push(...obj.appointments);
    }
  });
  let appointmentIDsFilter = [];
  let appointmentIDs = Object.keys(state.appointments);

  appointmentIDs.map((id) => {
    if (appointmentsArray.includes(parseInt(id))) {
      appointmentIDsFilter.push(state.appointments[id]);
    }
  });
  return appointmentIDsFilter;
}

export function getInterviewersForDay(state, day) {
  let interviewersArray = [];
  if (state.days.length === 0) {
    return interviewersArray;
  }
  state.days.map((obj) => {
    if (obj.name === day) {
      interviewersArray.push(...obj.interviewers);
    }
  });
  let interviewerIDsFilter = [];
  let interviewerIDs = Object.keys(state.interviewers);
  
  interviewerIDs.map((id) => {
    if (interviewersArray.includes(parseInt(id))) {
      interviewerIDsFilter.push(state.interviewers[id]);
    }
  });
  console.log("THESE ARE THE INTERVIEWERS from getInterviewersForDay function: ", interviewersArray);
  console.log(" interviewerIDsFilter, day = ", interviewerIDsFilter, day);
  return interviewerIDsFilter;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    let eachInterviewerData = state.interviewers[interview.interviewer];
    return {
      student: interview.student,
      interviewer: eachInterviewerData,
      // {
      //   id: interview.interviewer,
      //   name: eachInterviewerData.name,
      //   avatar: eachInterviewerData.avatar
      // }
    }
  }
}
