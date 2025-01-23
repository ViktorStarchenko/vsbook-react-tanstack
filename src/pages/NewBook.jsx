import { useActionData } from 'react-router-dom';
import BookForm from "../components/BookForm/BookForm";
import {Helmet} from "react-helmet-async";

export default function NewBookPage() {
    const data = useActionData();

    // console.log(data)

    return (
        <>
            <Helmet>
                <title>VSBookcollection Add New Book Page</title>
            </Helmet>
            <h1 className="h1">NEW BOOK PAGE</h1>
            <BookForm />

        </>
    )

}