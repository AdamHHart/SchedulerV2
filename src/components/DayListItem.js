import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames/bind';



export default function DayListItem(props) {
  const formatSpots = function(spots) {
    if(spots > 1) {
      return `${spots} spots remaining`;
    }
    else if(spots === 0) {
      return `no spots remaining`;
    }
    else {
      return `${spots} spot remaining`;
    }
  }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li data-testid="day" className = {dayClass} onClick = {
      props.setDay
    }>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

