import {Form, NavLink, useRouteLoaderData} from "react-router-dom";

export default function AuthNavigation() {
    const token = useRouteLoaderData('root');
    return (
        <>
            <ul className="header-nav-list login-menu">
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
        </>
    )
}