import React from "react";

const ProgressBar = ({ progress, visibility, opacity, progressTransition, visibilityTransition, opacityTransition }) => {

  const getClassNames = () => {
    let names = "progress-bar";
    if(progress === 100) {
      names += " progress-bar-hidden";
    }
    return names;
  }
  return (
    <div className="progress-bar-container">
      <div id="progress-bar" className={ getClassNames() } style={{width: progress+"%" }}></div>
    </div>
  );
};

export default ProgressBar;