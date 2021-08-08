import React from "react";
import Exercise from "../exercise/Exercise";

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
  //Using hooks rather than classes for simplicity
  const [progress, setProgress] = React.useState(0);
  const [opacity, setOpacity] = React.useState(1);
  const [progressTransition, setProgressTransition] = React.useState(0);
  const [opacityTransition, setOpacityTransition] = React.useState(0);

  const startRequest = () => {
    //Button shouldn't do anything if we're still in a request
    if(progress !== 0 && progress !== 100) {
      return null;
    }

    //'Instantly' reset the progress bar to visible and 0
    setOpacityTransition(0);
    setOpacity(1);
    setProgressTransition(0);
    setProgress(0);

    //TODO: Do this more cleanly, without setTimeout.
    //'Instantly' isn't instant in react -- wait until the update has rendered
    setTimeout(() => {
      setProgressTransition(15);
      setProgress(90);
    }, 100);
  }
  
  const finishRequest = () => {
    //Set progress bar to 100% over 1 second
    setProgressTransition(1);
    setProgress(100);

    //TODO: Also do this without timeouts.
    //After that one second, fade the bar out over three seconds
    setTimeout(() => {
      setOpacityTransition(3);
      setOpacity(0);
    },1000);
  }
  
  const startButtonText = () => {
    if(progress === 0 || progress === 100) {
      return "Start Request";
    } else {
      return "Loading...";
    }
  }

  return <div>
    <div data-testid="progress-bar" className="progress-bar" style={{width: progress+"%", opacity: opacity, transition: `width ${progressTransition}s ease, opacity ${opacityTransition}s ease` }}></div>
    <button data-testid="start-button" className="start-button" onClick={ startRequest }>{ startButtonText() }</button>
    <button data-testid="finish-button" className="finish-button" onClick={ finishRequest }>Finish Request</button>
  </div>;
};