import { useState, useEffect } from 'react';

import classes from './Notification.module.css';

const Notification = (props) => {
    let specialClasses = '';

    if (props.status === 'error') {
        specialClasses = classes.error;
    }
    if (props.status === 'success') {
        specialClasses = classes.success;
    }

    const cssClasses = `${classes.notification} ${specialClasses}`;

    const [progress, setProgress] = useState(100);

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
        </section>
    );
};

export default Notification;