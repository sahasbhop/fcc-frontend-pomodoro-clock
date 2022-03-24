import '../configuration/Configuration.css'
import {Fragment} from "react";

export const Session = (props) => {
    return <Fragment>
        <div className="configuration-box">
            <label id="session-label" className="configuration-title">Session Length</label>
            <label id="session-length" className="configuration-value">{props.minutes}</label>
            <label id="session-increment" className="configuration-adjustment" onClick={props.onIncrement}>+</label>
            <label id="session-decrement" className="configuration-adjustment" onClick={props.onDecrement}>-</label>
        </div>
    </Fragment>
}