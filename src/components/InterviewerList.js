import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from 'prop-types';


function InterviewerList(props) {
  const interviewersArray = props.interviewers && props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        // react wants the id here
        selected={interviewer.id === props.interviewer}
        //not setInterviewer(event.target.value), we want to setInterviewer as the specific interviewer from our array
        setInterviewer={event => props.setInterviewer(interviewer.id)}
        />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
{/* We render our array as an unordered list */}
      <ul className="interviewers__list">{interviewersArray}</ul>
    </section>
  );
}

//using propTypes library to test that our InterviewerList returns an array
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;

