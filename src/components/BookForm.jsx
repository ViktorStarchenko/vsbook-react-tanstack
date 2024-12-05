import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import Select from "./elements/Select";
import classes from './BookForm.module.css';
import Input from "./elements/Input";
import Modal from "./Modal";
import ModalSuccess from "./ModalSuccess";

import { useBooksTaxonomies } from "./hooks/useBooksTaxonomies";

export default function BookForm() {
    const data = useActionData();
    const navigation = useNavigation();
    const dialog = useRef();

    const [requestStatus, setRequestStatus] = useState(false);
    const [createdBook, setCreatedBook] = useState(null);

    useEffect(() => {
        if (data) {
            if (data.post) {
                setCreatedBook(data.post);
            }
            if (data.success) {
                dialog.current.open();
            }

        }
    }, [data]);

    const {genre, country, language, release, wrirer, readingStatus, loading, error} = useBooksTaxonomies();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Modal ref={dialog} title="Book was successfully created">
                {createdBook && <ModalSuccess book={createdBook}/>}
            </Modal>

           <Form method="POST">
               {data && data.errors &&
               <ul>
                   {Object.values(data.errors).map((err) => (
                       <li key={err}>{err}</li>
                   ))}
               </ul>}
               <div className={classes.formInner}>
                   <Input name="title" type="text" placeholder="Post title"/>
                   <Input name="status" type="text" placeholder="Post status"/>
                   <Input name="featured_image" type="file" placeholder="Image"/>
                   {/*<Input name="image" type="text" placeholder="Post image"/>*/}
                   <div className={classes.formField}>
                       <textarea className={classes.formFieldInput} type="textarea" name="content" placeholder="Content"/>
                   </div>
                   {genre && <div className="controlGenre">
                       {genre.map((item) => (
                           <label key={item.id} htmlFor="genre">
                               <input type="checkbox" name="genre" value={item.id}/>
                               {item.name}
                           </label>
                       ))}
                   </div>}

                   {country && <Select name="country" object={country}/>}
                   {language && <Select name="language" object={language}/>}
                   {release && <Select name="release" object={release}/>}
                   {wrirer && <Select name="wrirer" object={wrirer}/>}
                   {readingStatus && <Select name="reading_status" object={readingStatus}/>}

                   <button>Submit</button>
               </div>

           </Form>
        </>
    )
}