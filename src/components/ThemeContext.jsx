import {createContext, useState, useEffect, useContext} from "react";

export const ThemeToggleContext = createContext();

export const useThemeToggleContext = () => {
    const ctx = useContext(ThemeToggleContext);

    if (!ctx) {
        throw new Error("There is some error with your themeToggle");
    }

    return ctx;
};

export default function ThemeToggle({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("isDarkMode") === "true"
    );
    console.log(localStorage.getItem("isDarkMode"))
    useEffect(() => {
        document.body.className = isDarkMode ? "theme-dark" : "theme-light";
        localStorage.setItem("theme", isDarkMode ? "theme-dark" : "theme-light");
        localStorage.setItem("isDarkMode", isDarkMode);
    }, [isDarkMode]);

    const contextValue = {
        isDarkMode,
        setIsDarkMode
    }

    return (
        <ThemeToggleContext.Provider value={contextValue}>
            {children}
        </ThemeToggleContext.Provider>
    )
}
