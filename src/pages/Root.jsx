import {Outlet, useNavigation, useLoaderData, useSubmit} from 'react-router-dom';

import MainNavigation from "../components/MainNavigation";
import classes from './Root.module.css'
import Footer from "../components/Footer";
import {useEffect} from "react";
import {getTokenDuration} from "../util/auth";
import LoadingIndicator from "../components/LoadingIndicator";

export default function RootLayout() {
    const token = useLoaderData();
    const submit = useSubmit();

    useEffect(() => {
        if (!token) {
            return ;
        }

        if (token === 'EXPIRED') {
            submit(null, {action: '/logout', method: 'POST'})
        }

        const tokenDuration = getTokenDuration();
        // console.log(tokenDuration)

        setTimeout(() => {
            submit(null, {action: '/logout', method: 'POST'})
        }, tokenDuration);
    }, [token, submit]);
    const navigation = useNavigation();
    return (
        <>
            <MainNavigation />
            {navigation.state === 'loading' && <LoadingIndicator />}
            <main className={classes.content}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}