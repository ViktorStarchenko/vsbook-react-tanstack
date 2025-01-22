import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import {forwardRef, useImperativeHandle} from "react";

const MobileMenu = forwardRef(function MobileMenu({openMobileMenu, setOpenMobileMenu}, ref) {

    useImperativeHandle(ref, () => {
        return {
            openMobileMenu() {
                setOpenMobileMenu((openMobileMenu => openMobileMenu == true ? false : true));
            }
        }
    })

    return (
        <>
            <div className={`mobile-menu ${openMobileMenu ? 'open' : 'closed'}`}>
                <MainNavigation />
                <AuthNavigation />
            </div>
        </>
    )
})

export default MobileMenu;