import { useRouteError } from 'react-router-dom';

import MainNavigation from "../components/Header/MainNavigation";
import PageContent from "../components/PageContent";
import {Helmet} from "react-helmet-async";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error)
    let title = 'En error occured';
    let message = 'could not find this page';

    if (error.status === 500) {
        message = error.data;
    }

    if (error.status === 404) {
        title = 'Not Found';
        message = 'Missed page';
    }

    return (
        <>
            <Helmet>
                <title>VSBookcollection - Error Page</title>
            </Helmet>
            <MainNavigation />
            <PageContent title={title}>
                <main>
                    <p>{message}</p>
                </main>
            </PageContent>
        </>
    )
}