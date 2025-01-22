import Logo from "../../assets/images/logo-6.png";
import MainNavigation from "./MainNavigation";
import AuthNavigation from "./AuthNavigation";
import HeaderLogo from "./HeaderLogo";

export default function HeaderMobile() {
    return (
        <>
            <div className="header-inner wrapper-1220">
                <HeaderLogo />
                <MainNavigation />
                <AuthNavigation />
            </div>
        </>
    )
}