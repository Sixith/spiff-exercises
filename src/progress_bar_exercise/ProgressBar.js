import React from "react";

class ProgressBar extends React.Component {
  constructor (props) {
    super(props)
    this.widthTransitionCurve = "linear"
    this.state = {
      progress: 0,
      progressTransition: 0,
      opacity: 1,
      opacityTransition: 0
    }
  }

  setProgress(progress, time) {
    this.setState({
      progress: progress,
      progressTransition: time
    });
  }

  setOpacity(opacity, duration) { 
    this.setState({
      opacity: opacity,
      opacityTransition: duration
    });
  }

  getOpacity() {
    return this.props.hidden ? 0 : this.state.opacity;
  }
  
  getTransition() {
    return `width ${this.state.progressTransition}s ${this.widthTransitionCurve}, opacity ${this.state.opacityTransition}s ease`;
  }

  render () {
    return (
      <div data-testid="progress-bar" className="progress-bar" style={{width: this.state.progress+"%", opacity: this.getOpacity(), transition: this.getTransition() }}></div>
    )
  }
}
export default ProgressBar