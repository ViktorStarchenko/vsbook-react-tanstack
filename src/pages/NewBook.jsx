import { useActionData } from 'react-router-dom';
import BookForm from "../components/BookForm/BookForm";

export default function NewBookPage() {
    const data = useActionData();

    // console.log(data)

    return (
        <>
            <h1 className="h1">NEW BOOK PAGE</h1>
            <BookForm />

        </>
    )

}