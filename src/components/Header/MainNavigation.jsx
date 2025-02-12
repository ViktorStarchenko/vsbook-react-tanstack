import {Form, NavLink, useRouteLoaderData} from "react-router-dom";

import classes from '../MainNavigation.module.css'
import MultiLevelMenu from "../MultiLevelMenu/MultiLevelMenu";
import ThemeColorToggle from "../ThemeColorToggle/ThemeColorToggle";

export default function MainNavigation() {
    const token = useRouteLoaderData('root');
    // console.log(token)
    return (
        <ul className="header-nav-list main-menu">
            {/*<li>*/}
            {/*    <NavLink*/}
            {/*        to="/books"*/}
            {/*        className={({isActive}) => isActive ? 'active' : undefined}*/}
            {/*    >Books</NavLink>*/}
            {/*</li>*/}
            <ThemeColorToggle />
            <MultiLevelMenu />
            {token && (
                <li>
                    <NavLink
                        to="/new"
                        className={({isActive}) => isActive ? 'active' : undefined}
                    >Add New</NavLink>
                </li>
            )}
        </ul>
    )
}