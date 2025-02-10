import { useState, useEffect } from 'react';

import classes from './Notification.module.css';
import {useDispatch} from "react-redux";
import {uiSliceActions} from "../../store/ui-slice";

const Notification = (props) => {
    const dispatch = useDispatch();

    let specialClasses = '';

    if (props.status === 'error') {
        specialClasses = classes.error;
    }
    if (props.status === 'success') {
        specialClasses = classes.success;
    }

    const cssClasses = `${classes.notification} ${specialClasses}`;

    const [progress, setProgress] = useState(100);

    const closeNotification = () => {
        dispatch(uiSliceActions.clearNotification());
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => Math.max(prev - 1, 0));
        }, 30); // 30ms * 100 шагов ≈ 3 секунды

        return () => clearInterval(interval);
    }, []);

    return (
        <section className={cssClasses}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
            <progress max="100" value={progress}></progress>
            <span onClick={closeNotification}>⤬</span>
        </section>
    );
};

export default Notification;