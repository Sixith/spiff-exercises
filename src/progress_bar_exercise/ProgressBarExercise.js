import React from "react";
import Exercise from "../exercise/Exercise";
import ProgressBar from "./ProgressBar";

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
  const [progress, setProgress] = React.useState(0);
  const [visibility, setProgress] = React.useState("visible");
  const [opacity, setProgress] = React.useState(1);
  const [progressTransition, setProgress] = React.useState(0);
  const [visibilityTransition, setProgress] = React.useState(0);
  const [opacityTransition, setProgress] = React.useState(0);

  const startRequest = () => {
    console.log("starting");
    setProgress(0);
    fakeRequest(90,15000);
  }
  
  const finishRequest = () => {
    console.log("finishing");
    clearInterval(timer);
    setProgress(100);
  }
  
  const startButtonText = () => {
    if(progress === 0 || progress === 100) {
      return "Start Request";
    } else {
      return "Loading...";
    }
  }

  const fakeRequest = (targetPercentage, durationInMS) => {
    let interval = 1000;
    let startPercentage = progress;
    let incrementPercentage = (targetPercentage - startPercentage) * (interval/durationInMS);
    console.log("increment", incrementPercentage);
    timer = setInterval(() => {
        console.log("timinggggg: "+progress);
        /*let newProgress = progress+incrementPercentage;
        console.log("newprogress",newProgress);
        if(newProgress >= targetPercentage ) {
          console.log("doneeee");
          setProgress(targetPercentage);
          clearInterval(timer);
        } else {
          console.log("increment");
          setProgress(newProgress);
        }*/
        incrementProgress(1);
      }, 1000);
  }

  const incrementProgress = (incrementPercentage, delay) => {
    console.log("incrementing");
    setProgress(progress+incrementPercentage);
    //setTimeout(incrementProgress(incrementPercentage, delay), delay);
  }
  
  return <div>
    <ProgressBar progress={progress} />
    <button className="start-button" onClick={ startRequest }>{ startButtonText() }</button>
    <button className="finish-button" onClick={ finishRequest }>Finish Request</button>
  </div>;
};


