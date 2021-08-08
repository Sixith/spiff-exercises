import React, { useRef, useState } from "react";
import Exercise from "../exercise/Exercise";
import ProgressBar from "./ProgressBar";
import BreakingBar from "./BreakingBar";

import "./ProgressBarExercise.scss"

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  //TODO: Be less naive about swapping between bars. However, this lets us swap on the fly which could be worth it.
  const pBarRef = useRef();
  const bBarRef = useRef();
  let [progress, setProgress] = useState(0);
  let [simpleBar, setSimpleBar] = useState(true); 

  //Set a constant set of breakpoints
  const breakpoints = [10,25,50,70].sort((a, b) => a - b);

  const startRequest = () => {
    //Button shouldn't do anything if we're still in a request
    if(progress !== 0 && progress !== 100) {
      return null;
    }

    //'Instantly' reset the progress bar to visible and 0
    setProgress(0);
    pBarRef.current.setProgress(0,0);
    pBarRef.current.setOpacity(1,0);
    bBarRef.current.setProgress(0,0);
    bBarRef.current.setOpacity(1,0);
    

    //TODO: Do this more cleanly, without setTimeout.
    //'Instantly' isn't instant in react -- wait until the update has rendered
    setTimeout(() => {
      setProgress(90);
      pBarRef.current.setProgress(90,15);
      bBarRef.current.setProgress(90,15);
    }, 100);
  }
  
  const finishRequest = () => {
    //Set progress bar to 100% over 1 second
    setProgress(100);
    pBarRef.current.setProgress(100,1);
    bBarRef.current.setProgress(100,1, true);

    //TODO: Also do this without timeouts.
    //After that one second, fade the bar out over three seconds
    setTimeout(() => {
      pBarRef.current.setOpacity(0,3);
      bBarRef.current.setOpacity(0,3);
    },1000);
  }

  const swapBars = () => {
    setSimpleBar(!simpleBar);
  }
  
  const startButtonText = () => {
    if(progress === 0 || progress === 100) {
      return "Start Request";
    } else {
      return "Loading...";
    }
  }

  const swapButtonText = () => {
    if(simpleBar) {
      return "Simple Bar";
    } else {
      return "Breaking Bar";
    }
  }

  return <div>
    <ProgressBar ref={pBarRef} hidden={!simpleBar}/>
    <BreakingBar ref={bBarRef} breakpoints={breakpoints} hidden={simpleBar} />
    <button data-testid="start-button" className="start-button" onClick={ startRequest }>{ startButtonText() }</button>
    <button data-testid="finish-button" className="finish-button" onClick={ finishRequest }>Finish Request</button>
    <button data-testid="swap-button" className="swap-button" onClick={ swapBars }>{ swapButtonText() }</button>
  </div>;
};