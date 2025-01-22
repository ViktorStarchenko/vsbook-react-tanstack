import Logo from "../../assets/images/logo-6.png";
import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import MobileMenu from "./MobileMenu";
import {Link} from "react-router-dom";
import HeaderLogo from "./HeaderLogo";

export default function HeaderDesktop() {
    return(
        <>
            <header className="header desktop">
                <div className="header-inner wrapper-1220">
                    <HeaderLogo />
                    <MainNavigation />
                    <AuthNavigation />
                </div>
            </header>
        </>
    )
}