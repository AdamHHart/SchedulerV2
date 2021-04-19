import React from "react";
import "components/InterviewerListItem.scss"
const classNames = require('classnames');


export default function InterviewerListItem(props) {
  console.log(props);
  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li className = {interviewerClass} onClick = {
      props.setInterviewer
    }>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>   
  );
}


// const dayClass = classNames("day-list__item", {
//   "day-list__item--selected": props.selected,
//   "day-list__item--full": props.spots === 0
// });

// return (
//   <li className = {dayClass} onClick = {() => {
//     props.setDay(props.name);
//   }}>
//     <h2 className="text--regular">{props.name}</h2> 
//     <h3 className="text--light">{formatSpots(props.spots)}</h3>
//   </li>
// );
// }
