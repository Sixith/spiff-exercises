import React from "react";
import ProgressBar from "./ProgressBar";

class BreakingBar extends ProgressBar {
  constructor (props) {
    super(props)
    this.widthTransitionCurve = "ease"
    this.startProgress = 0;
    this.endProgress = 0;
    this.totalProgress = 0;
    this.totalTime = 0;
  }

  setProgress(progress, time, smooth = false) {
    this.startProgress = this.state.progress;
    this.endProgress = progress;
    this.totalProgress = this.endProgress - this.startProgress;
    this.totalTime = time;

    //If the change is instant, negative, or zero, don't use break points
    if(time === 0 || this.totalProgress <= 0 || smooth === true) {
      this.setState({
        progress: progress,
        progressTransition: time
      });
      return;
    }

    this.stepAnimation();
  }

  stepAnimation() {
    //TODO: Clean up logic in here
    if(this.state.progress === this.endProgress) {
      //We're already done
      return;
    }

    let [nextBreakpoint, nextTimestep] = this.nextBreakpoint();
    this.setState({
      progress: nextBreakpoint,
      progressTransition: nextTimestep
    });
    if(nextBreakpoint === this.endProgress) {
      return;
    }

    //After we give this animation the correct amount of time to finish, start the next one
    //TODO: Find a better solution than setTimeout
    setTimeout(() => {
      let [nextBreakpoint, nextTimestep] = this.nextBreakpoint();
      this.stepAnimation(nextBreakpoint, nextTimestep);
    }, nextTimestep*1000);
  }

  nextBreakpoint() {
    let breakpoint;
    for(let k = 0; k < this.props.breakpoints.length; k++) {
      if(this.props.breakpoints[k] >= this.endProgress) {
        //If this breakpoint is past our end goal, break at our end goal
        breakpoint = this.endProgress;
        break;
      }
      if(this.props.breakpoints[k] > this.state.progress) {
        //Otherwise, if the next breakpoint is greater than our current progress, break at it
        breakpoint = this.props.breakpoints[k];
        break;
      }
    }
    if(breakpoint === undefined) {
      breakpoint = this.endProgress;
    }
    //Next progress amount is the difference between where we are now and where we need to slow down
    const nextProgressAmount = breakpoint - this.state.progress;

    //This can be adjusted if the overall progress shouldn't still be linear
    const nextTimestep = this.totalTime * (nextProgressAmount/this.totalProgress);
    //console.log("current",this.startProgress, this.endProgress, this.totalProgress, this.totalTime);
    //console.log("breakpoint", breakpoint, nextTimestep);
    return [breakpoint, nextTimestep];
  }

  render () {
    return (
      <div data-testid="breaking-bar" className="breaking-bar" style={{width: this.state.progress+"%", opacity: this.getOpacity(), transition: this.getTransition() }}></div>
    )
  }
}
export default BreakingBar