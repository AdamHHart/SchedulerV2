import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";


export default function InterviewerList(props) {
  console.log("props in interviewerList component = ", props);
  const interviewersArray = props.interviewers.map(interviewer => {
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


// export default function DayList(props)  {

//   const daysArray = props.days.map(day => {
//     console.log("props = ", props);
//     console.log("days = ", props.days);
//     return (
//           <DayListItem 
//             key={day.id}
//             name={day.name} 
//             spots={day.spots} 
//             selected={day.name === props.day}
//             setDay={props.setDay}  
//             />
//     );
//   })
//   return <ul>{ daysArray }</ul>
// }