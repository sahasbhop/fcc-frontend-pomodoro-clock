import '../configuration/Configuration.css'
import {Fragment} from "react";

export const Break = (props) => {
    return <Fragment>
        <div className="configuration-box">
            <label id="break-label" className="configuration-title">Break Length</label>
            <label id="break-length" className="configuration-value">{props.minutes}</label>
            <label id="break-increment" className="configuration-adjustment" onClick={props.onIncrement}>+</label>
            <label id="break-decrement" className="configuration-adjustment" onClick={props.onDecrement}>-</label>
        </div>
    </Fragment>
}