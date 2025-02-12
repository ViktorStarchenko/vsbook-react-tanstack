import {useThemeToggleContext} from "../ThemeContext";

import classes from './ThemeColorToggle.module.css'

export default function ThemeColorToggle() {
    const { isDarkMode, setIsDarkMode } = useThemeToggleContext();

    return (
        <div className={classes.themeColorToggleWrapper}>
            <div className={classes.themeColorToggle} onClick={() => setIsDarkMode(!isDarkMode)}></div>
            <div className={classes.themeColorToggleIcon}>☾</div>
        </div>

    )
}