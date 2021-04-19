import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";

import "components/InterviewerListItem.scss"

import DayList from "components/DayList";
import "components/Appointment";
import Appointment from "components/Appointment";

import { getAppointmentsForDay } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";

import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);


// console.log("state.interviewers", state.interviewers);

  // const scheduleList = dailyAppointments.map(eachAppointment => {
  //   // const interview = getInterview(state, eachAppointment.interview);
  //   return (
  //     <Appointment
  //     key={eachAppointment.id}
  //     {...eachAppointment}
  //     // interviewer={}
  //     interviewersForDay={state.interviewers}
  //     bookInterview={bookInterview}
  //     cancelInterview={cancelInterview}
  //     // editInterview={editInterview}
  //   />
  //   )
  // })

  const appointmentsJSX = getAppointmentsForDay(state, state.day).map(
    appointment => {
      const interview = getInterview(state, appointment.interview);
      const interviewersForDay = getInterviewersForDay(state, state.day);
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={interview}
          interviewersForDay={interviewersForDay}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentsJSX}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

