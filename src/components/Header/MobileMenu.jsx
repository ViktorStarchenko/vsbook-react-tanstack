import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import {forwardRef, useEffect, useImperativeHandle, useRef, useCallback} from "react";

const MobileMenu = forwardRef(function MobileMenu({openMobileMenu, setOpenMobileMenu}, ref) {

    const mobileMenuRef = useRef();

    useImperativeHandle(ref, () => {
        return {
            openMobileMenu() {
                setOpenMobileMenu((openMobileMenu => openMobileMenu == true ? false : true));
            }
        }
    })

    useEffect(() => {
        if (!openMobileMenu) return;

        const handleClickOutside = (event) => {
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !event.target.closest(".menu-burger") // Eliminating the burger button
            ) {
                setOpenMobileMenu(false);
            }
        };

        // We wait until the menu is updated, then we hang the handler
        const timeoutId = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 10);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openMobileMenu]);

    return (
        <>
            <div ref={mobileMenuRef} className={`mobile-menu ${openMobileMenu ? 'open' : 'closed'}`}>
                <MainNavigation />
                <AuthNavigation />
            </div>
        </>
    )
})

export default MobileMenu;