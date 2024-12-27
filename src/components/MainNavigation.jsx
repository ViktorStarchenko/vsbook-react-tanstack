import {Form, NavLink, useRouteLoaderData} from "react-router-dom";

import classes from './MainNavigation.module.css'

export default function MainNavigation() {
    const token = useRouteLoaderData('root');
    console.log(token)
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
                    {token && (
                        <li>
                            <NavLink
                                to="/new"
                                className={({isActive}) => isActive ? 'active' : undefined}
                            >Add New</NavLink>
                        </li>
                    )}
                    {!token && (
                        <li>
                            <NavLink
                                to="/auth"
                                className={({isActive}) => isActive ? 'active' : undefined}
                            >Auth</NavLink>
                        </li>
                    )}
                    {token && (
                        <li>
                            <Form action="/logout" method="POST">
                                <button className="btn">Logout</button>
                            </Form>
                        </li>
                    )}

                </ul>
            </nav>
        </header>
    )
}