import { useRouteError } from 'react-router-dom';

import MainNavigation from "../components/Header/MainNavigation";
import PageContent from "../components/PageContent";
import {Helmet} from "react-helmet-async";
import ErrorsBlockSingle from "../components/ErrorsBlock/ErrorsBlockSingle";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error)
    console.log(error.error)
    let title = 'En error occured';
    let message = 'could not find this page';
    let content;

    if (error.status === 500) {
        message = error.data;
    }

    if (error.status === 404) {
        title = 'Not Found';
        message = 'Missed page';
    }
    if (error && error.message) {
        content = <ErrorsBlockSingle error={error.message}/>;
    }
    if (error && error.error) {
        content = <ErrorsBlockSingle error={error.error.message}/>;
    }

    return (
        <>
            <Helmet>
                <title>VSBookcollection - Error Page</title>
            </Helmet>
            <Header />
            <PageContent title={title}>
                <main>
                    {content}
                </main>
            </PageContent>
            <Footer />
        </>
    )
}