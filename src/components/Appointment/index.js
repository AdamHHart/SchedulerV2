import React from "react";
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status"; 
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

import useVisualMode from "hooks/useVisualMode";

import Form from "./Form";



export default function Appointment(props) {

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
  return (
    <article className = "appointment" data-testid="appointment">
      <Header time={props.time}></Header>
      
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        
        {mode === SHOW && (
                  <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={editInterview}
          onDelete={confirmCancel}
          ></Show>)}

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
        {mode === DELETING && <Status message="Deleting"></Status>}

        {mode === CONFIRM && (
        <Confirm
        message="Are you sure you'd like to delete this interview?"
        onCancel={back}
        onConfirm={confirmCancel}
        ></Confirm>)}

        {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer}      
        // interviewers={props.interviewers}
        interviewers={props.interviewersForDay}
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
        message="failed to save"
        onClose={back}

        ></Error>)}
    </article>
  )
}



