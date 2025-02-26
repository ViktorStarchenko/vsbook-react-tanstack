import classes from './Tooltip.module.css'
import {useState} from "react";

export default function Tooltip({icon, body}) {

    const [showContent, setShowContent] = useState();

    function handleTooltip(data) {
        setShowContent(prevState => prevState = data)
    }

    return (
        <div className={classes['tooltip-wrapper']}>
            <div
                className={classes['tooltip-icon']}
                onMouseEnter={() => handleTooltip(true)}
                onMouseLeave={() => handleTooltip(false)}
            >ℹ</div>
            <div className={`${classes['tooltip-body']} ${showContent ? classes['show'] : ''}`}>
                {body}
            </div>
        </div>
    )
}