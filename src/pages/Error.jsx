import { useRouteError } from 'react-router-dom';

import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

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
            <MainNavigation />
            <PageContent title={title}>
                <main>
                    <p>{message}</p>
                </main>
            </PageContent>
        </>
    )
}