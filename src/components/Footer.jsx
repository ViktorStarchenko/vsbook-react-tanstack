import classes from './Footer.module.css';
import RecentlyViewed from "./RecentlyViewed";
import {useThemeToggleContext} from "./ThemeContext";

export default function Footer() {

    const { isDarkMode, setIsDarkMode } = useThemeToggleContext();

    return (
        <>
            <RecentlyViewed />
            <footer className="">
                <button onClick={() => setIsDarkMode(!isDarkMode)}>{isDarkMode ? "Светлая тема" : "Тёмная тема"}</button>
                <div className="wrapper-1220">
                    <p>Viktor Starchenko Test React</p>
                </div>
            </footer>
        </>
    )
}