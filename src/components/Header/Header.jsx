import Logo from '../../assets/images/logo-6.png'
import classes from "../MainNavigation.module.css";
import {Form, NavLink, useRouteLoaderData} from "react-router-dom";
import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import {useRef, useState} from "react";
import MobileMenu from "./MobileMenu";
import HeaderLogo from "./HeaderLogo";
import FavouriteNavigation from "./FavouriteNavigation";
import CartNavigation from "./CartNavigation";
import MultiLevelMenu from "../MultiLevelMenu/MultiLevelMenu";

export default function Header() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const mobileMenuRef = useRef();

    const token = useRouteLoaderData('root');

    function handleOpenMobileMenu() {
        mobileMenuRef.current.openMobileMenu();
    }
    return (
        <>
            <header className="header">
                <div className="header-inner wrapper-1220">
                    <HeaderLogo />

                    <div className="header-nav-desktop">

                        {/*<MultiLevelMenu />*/}
                        <MainNavigation />

                        <AuthNavigation />
                    </div>

                    <FavouriteNavigation />

                    <CartNavigation />

                    <div className={`menu-burger ${openMobileMenu ? 'open' : 'closed'}`} onClick={handleOpenMobileMenu}></div>

                    <MobileMenu openMobileMenu={openMobileMenu} setOpenMobileMenu={setOpenMobileMenu} ref={mobileMenuRef}/>
                </div>
            </header>
            <div className="header-spacing"></div>
        </>
    )
}