import { useActionData } from 'react-router-dom';
import BookForm from "../components/BookForm";

export default function NewBookPage() {
    const data = useActionData();

    // console.log(data)

    return (
        <>
            <h1>NEW BOOK PAGE</h1>
            <BookForm />
        </>
    )

}