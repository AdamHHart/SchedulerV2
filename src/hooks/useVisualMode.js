import {useState} from "react";


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
    }
    if(!replace) {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }

  const back = function() {
    const newHistoryArray = [...history];

    if (history.length === 1) {
      setMode(initial);
    } else {
      setMode(newHistoryArray[newHistoryArray.length - 2]);
      setHistory(newHistoryArray.slice(-1));
    }
  }
  return{ mode, transition, back};
}