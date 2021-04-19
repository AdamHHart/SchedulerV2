import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status"; 
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


import useVisualMode from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";
// import  Application  from "components/Application";
// import getInterviewersForDay from "helpers/selectors";

import Form from "./Form";




export default function Appointment(props) {

  console.log("props.interviewers = ", props.interviewers);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

const {
  state,
  setDay,
  bookInterview,
  cancelInterview
} = useApplicationData();

// const { state, setDay,  bookInterview,     cancelInterview   } = useApplicationData();


function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };

  transition(SAVING);

  props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
}

function confirmCancel() {

  if (mode === CONFIRM) {
    transition(DELETING, true)
    
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  } else {
    transition(CONFIRM);
  }
};


const editInterview = () => transition(EDIT);

console.log("props", props);
console.log("STATE ========", state.interviewers);
// console.log("props.interview.interviewer", props.interview.interviewer);

  return (
    <article className = "appointment">
      <Header time={props.time}></Header>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        
        {mode === SHOW && (
                  <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={editInterview}
          onDelete={confirmCancel}
          ></Show>
        )}

        {mode === CREATE && (
        <Form
        name={props.name}
        value={props.value}
        interviewers={props.interviewersForDay}
        // interviewers={[]}
        onSave={save}
        onCancel={back}
        
        ></Form>)}

        {mode === SAVING && <Status message="Saving"></Status>}
        
        {mode === CONFIRM && (
        <Confirm
        message="are you sure you'd like to delete this interview?"
        onCancel={back}
        onConfirm={confirmCancel}
        ></Confirm>)}


        {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer}      
        // interviewers={props.interviewers}
        interviewers={[]}
        onSave={save}
        onCancel={back}
        ></Form>)}
        {mode === ERROR_DELETE && (
        <Error
        message="failed to delete"
        onClose={back}

        ></Error>)}
        {mode === ERROR_SAVE && (
        <Error
        message="failed to delete"
        onClose={back}

        ></Error>)}

      )
      
    </article>
  )
}



