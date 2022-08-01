import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isPaused: false,
    defaultTimeInMinutes: 25,
    defaultTimeInSeconds: 0,
    isReset: false,
    int: null,
  }

  componentDidMount() {
    const {defaultTimeInMinutes} = this.state
    this.setState({int: defaultTimeInMinutes})
  }

  increment = () => {
    const {isPaused, isReset} = this.state
    if (!isPaused && !isReset) {
      this.setState(prevState => ({
        defaultTimeInMinutes: parseInt(prevState.defaultTimeInMinutes) + 1,
      }))
      this.componentDidMount()
    }
  }

  decrement = () => {
    const {isPaused, isReset} = this.state
    if (!isPaused && !isReset) {
      this.setState(prevState => ({
        defaultTimeInMinutes: parseInt(prevState.defaultTimeInMinutes) - 1,
      }))
      this.componentDidMount()
    }
  }

  funCalled = () => {
    const {isPaused} = this.state

    if (!isPaused) {
      this.timerID = setInterval(this.tick, 1000)
      this.setState({
        isReset: true,
      })
      this.setState(prevState => ({int: prevState.int}))
    }
  }

  startOrStopButtonClicked = () => {
    const {isReset} = this.state
    this.setState(prevState => ({
      isPaused: !prevState.isPaused,
    }))
    this.funCalled()
    if (isReset === false) {
      this.componentDidMount()
    }
  }

  tick = () => {
    const {isPaused, defaultTimeInSeconds} = this.state
    if (isPaused) {
      if (defaultTimeInSeconds <= 0) {
        this.setState(prevState => ({
          defaultTimeInMinutes: prevState.defaultTimeInMinutes - 1,
          defaultTimeInSeconds: 60,
        }))
      }

      this.setState(prevState => ({
        defaultTimeInSeconds: prevState.defaultTimeInSeconds - 1,
      }))
    } else {
      console.log('timer stopped', isPaused)
      clearInterval(this.timerID)
    }
  }

  resetButtonClicked = () => {
    this.setState({
      isPaused: false,
      defaultTimeInMinutes: 25,
      defaultTimeInSeconds: 0,
      int: null,
      isReset: false,
    })
    this.componentDidMount()
  }

  render() {
    const {isPaused, isReset, int} = this.state

    let {defaultTimeInMinutes, defaultTimeInSeconds} = this.state

    if (defaultTimeInSeconds < 10) {
      defaultTimeInSeconds = `0${defaultTimeInSeconds.toString()}`
    }

    if (defaultTimeInMinutes < 10) {
      defaultTimeInMinutes = `0${defaultTimeInMinutes.toString()}`
    }

    return (
      <div className="bg">
        <div className="main-container">
          <h1 className="title">Digital Timer</h1>
          <div className="sub-container">
            <div className="left-container">
              <div className="time-circle">
                <h1 className="time-in-circle">
                  {defaultTimeInMinutes}:{defaultTimeInSeconds}
                </h1>
                <p className="running">{isPaused ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="right-container">
              <div className="buttons-container">
                <button
                  className="start-or-stop-button"
                  type="button"
                  onClick={this.startOrStopButtonClicked}
                  alt={isPaused ? 'pause icon' : 'play icon'}
                >
                  <img
                    src={
                      isPaused
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isPaused ? 'pause icon' : 'play icon'}
                    className="play-or-pause-icon"
                  />
                  {isPaused ? 'Pause' : 'Start'}
                </button>

                <button
                  className="reset-button"
                  type="button"
                  onClick={this.resetButtonClicked}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                    alt="reset icon"
                    className="reset-icon"
                  />
                  Reset
                </button>
              </div>
              <div className="timer-buttons-container">
                <p className="set-time-text">Set Timer Limit</p>
                <div className="timer-buttons">
                  <button
                    className="span"
                    type="button"
                    onClick={this.decrement}
                  >
                    -
                  </button>{' '}
                  <p className="time-limit-box">
                    {isReset ? int : defaultTimeInMinutes}
                  </p>{' '}
                  <button
                    className="span"
                    type="button"
                    onClick={this.increment}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
