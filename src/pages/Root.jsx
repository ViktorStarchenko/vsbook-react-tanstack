import { Outlet, useNavigation } from 'react-router-dom';

import MainNavigation from "../components/MainNavigation";
import classes from './Root.module.css'
import Footer from "../components/Footer";

export default function RootLayout() {
    const navigation = useNavigation();
    return (
        <>
            <MainNavigation />
            {navigation.state === 'loading' && <p>Loading...</p>}
            <main className={classes.content}>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}