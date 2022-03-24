import './App.css';
import {Time} from "./time/Time";
import {Session} from "./session/Session";
import {Break} from "./break/Break";
import {useState} from "react";

const App = () => {
    const DEFAULT_SESSION_LENGTH = 25
    const DEFAULT_BREAK_LENGTH = 5
    const MAX_LENGTH = 60
    const MINIMUM_LENGTH = 1
    const [isRunning, setIsRunning] = useState(false)
    const [sessionLength, setSessionLength] = useState(DEFAULT_SESSION_LENGTH)
    const [breakLength, setBreakLength] = useState(DEFAULT_BREAK_LENGTH)

    const onTimerStateChange = (state) => {
        setIsRunning(state)
    }
    const onTimeReset = () => {
        setSessionLength(DEFAULT_SESSION_LENGTH)
        setBreakLength(DEFAULT_BREAK_LENGTH)
        const beep = document.getElementById('beep')
        beep.pause()
        beep.currentTime = 0
    }
    const onTimesUp = () => {
        document.getElementById('beep').play()
    }
    const onSessionLengthIncrement = () => {
        if (isRunning) return
        setSessionLength(prevState => prevState < MAX_LENGTH ? prevState + 1 : MAX_LENGTH)
    }
    const onSessionLengthDecrement = () => {
        if (isRunning) return
        setSessionLength(prevState => prevState > MINIMUM_LENGTH ? prevState - 1 : MINIMUM_LENGTH)
    }
    const onBreakLengthIncrement = () => {
        if (isRunning) return
        setBreakLength(prevState => prevState < MAX_LENGTH ? prevState + 1 : MAX_LENGTH)
    }
    const onBreakLengthDecrement = () => {
        if (isRunning) return
        setBreakLength(prevState => prevState > MINIMUM_LENGTH ? prevState - 1 : MINIMUM_LENGTH)
    }
    return <div id="app">
        <label className="title">Pomodoro Clock</label>
        <Time
            sessionLength={sessionLength}
            breakLength={breakLength}
            onTimerStateChange={onTimerStateChange}
            onTimeReset={onTimeReset}
            onTimesUp={onTimesUp}
        />
        <div className="row">
            <Session
                minutes={sessionLength}
                onIncrement={onSessionLengthIncrement}
                onDecrement={onSessionLengthDecrement}
            />
            <Break
                minutes={breakLength}
                onIncrement={onBreakLengthIncrement}
                onDecrement={onBreakLengthDecrement}
            />
        </div>
        <audio
            id="beep"
            preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
}

export default App