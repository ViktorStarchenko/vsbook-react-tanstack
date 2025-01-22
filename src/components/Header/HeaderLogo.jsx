import Logo from "../../assets/images/logo-6.png";
import {NavLink} from "react-router-dom";

export default function HeaderLogo() {
    return (
        <>
            <NavLink to="/" className="header-logo" end>
                <img src={Logo} alt="vsbookcollection logo"/>
            </NavLink>
        </>
    )
}