import { useEffect, useRef, useCallback } from "react";

export function useAccordion() {
    const panelRef = useRef(null);
    const buttonRef = useRef(null);

    const handleAccordionToggle = useCallback(() => {
        const panel = panelRef.current;
        const button = buttonRef.current;

        const isActive = panel.style.maxHeight;

        if (isActive) {
            panel.style.maxHeight = null;
            panel.classList.remove("active");
            button.classList.remove("active");
        } else {
            // panel.style.maxHeight = `${panel.scrollHeight}px`;
            panel.style.maxHeight = `250px`;
            panel.classList.add("active");
            button.classList.add("active");
        }
    }, []);

    const handleClickOutside = useCallback((event) => {
        const panel = panelRef.current;
        const button = buttonRef.current;

        if (panel && !panel.contains(event.target) && button && !button.contains(event.target)) {
            panel.style.maxHeight = null;
            panel.classList.remove("active");
            button.classList.remove("active");
        }
    }, []);

    useEffect(() => {
        const button = buttonRef.current;

        if (!button) return;

        button.addEventListener("click", handleAccordionToggle);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            button.removeEventListener("click", handleAccordionToggle);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleAccordionToggle, handleClickOutside]);

    return { buttonRef, panelRef };
}
