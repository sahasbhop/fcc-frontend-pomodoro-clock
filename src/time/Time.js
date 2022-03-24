import './Time.css'
import {Fragment, useEffect, useState} from "react";

export const Time = (props) => {
    const DEFAULT_TIMER_ID = 0
    const INTERVAL_MS = 250
    const TIMER_LABEL_SESSION = 'Session'
    const TIMER_LABEL_BREAK = 'Break'
    const {sessionLength, breakLength, onTimeReset, onTimerStateChange, onTimesUp} = props
    const [state, setState] = useState({label: TIMER_LABEL_SESSION, seconds: 0})
    const [timerId, setTimerId] = useState(DEFAULT_TIMER_ID)

    useEffect(() => {
        setState({label: TIMER_LABEL_SESSION, seconds: sessionLength * 60})
    }, [sessionLength])

    const timeDisplay = (seconds) => {
        const mm = Math.floor(seconds / 60).toString().padStart(2, '0')
        const ss = (seconds % 60).toString().padStart(2, '0')
        return `${mm}:${ss}`
    }

    const onReset = () => {
        setState({label: TIMER_LABEL_SESSION, seconds: sessionLength * 60})
        stopTimer()
        onTimeReset()
    }

    const onStartStop = () => {
        if (timerId && timerId !== DEFAULT_TIMER_ID) {
            stopTimer();
        } else {
            startTimer();
        }
    }

    const startTimer = () => {
        const timerId = setInterval(onTimerTick, INTERVAL_MS)
        setTimerId(timerId)
        onTimerStateChange(true)
    }

    const stopTimer = () => {
        if (!timerId || timerId === DEFAULT_TIMER_ID) {
            return
        }
        clearInterval(timerId)
        setTimerId(DEFAULT_TIMER_ID)
        onTimerStateChange(false)
    }

    const onTimerTick = () => {
        setState(prevState => {
            const nextSeconds = prevState.seconds - 1
            if (nextSeconds === 0) {
                console.log(`Time's up`)
                onTimesUp()
            }
            if (nextSeconds < 0) {
                if (prevState.label === TIMER_LABEL_SESSION) {
                    console.log(`Break start`)
                    return {label: TIMER_LABEL_BREAK, seconds: breakLength * 60}
                } else {
                    console.log(`Session start`)
                    return {label: TIMER_LABEL_SESSION, seconds: sessionLength * 60}
                }
            }
            return {label: prevState.label, seconds: nextSeconds}
        })
    }

    return <Fragment>
        <label id="timer-label" className="time-label">{state.label}</label>
        <label id="time-left" className="time-display">{timeDisplay(state.seconds)}</label>
        <div className="control-box">
            <label id="start_stop" className="control-button-bg" onClick={onStartStop}>Start / Stop</label>
            <label id="reset" className="control-button-bg" onClick={onReset}>Reset</label>
        </div>
    </Fragment>
}