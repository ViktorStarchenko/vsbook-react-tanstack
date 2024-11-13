import { NavLink } from "react-router-dom";

import classes from './MainNavigation.module.css'

export default function MainNavigation() {

    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/"
                            className={({isActive}) => isActive ? 'active' : undefined}
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/books"
                            className={({isActive}) => isActive ? 'active' : undefined}
                        >Books</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/new"
                            className={({isActive}) => isActive ? 'active' : undefined}
                        >Add New</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}