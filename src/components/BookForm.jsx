import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import { fetchGenre, fetchCountry, fetchLanguage, fetchRelease, fetchWrirer, fetchReadingStatus } from "../booksFunctions";
import Select from "./elements/Select";
import classes from './BookForm.module.css';
import Input from "./elements/Input";
import Modal from "./Modal";
import ModalSuccess from "./ModalSuccess";

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

    const [genre, setGenre] = useState([]);
    const [country, setCountry] = useState([]);
    const [language, setLanguage] = useState([]);
    const [release, setRelease] = useState([]);
    const [wrirer, setWrirer] = useState([]);
    const [readingStatus, setReadingStatus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        // Вызов функции для получения жанров при монтировании компонента
        const loadGenre = async () => {
            setLoading(true);
            const data = await fetchGenre();
            if (data) {
                setGenre(data);
            } else {
                setError("Failed to load genres");
            }
            setLoading(false);
        };

        const loadCountry = async () => {
            setLoading(true);
            const data = await fetchCountry();
            if (data) {
                setCountry(data);
            } else {
                setError("Failed to load genres");
            }
            setLoading(false);
        };

        const loadLanguage = async () => {
            setLoading(true);
            const data = await fetchLanguage();
            if (data) {
                setLanguage(data);
            } else {
                setError("Failed to load genres");
            }
            setLoading(false);
        };

        const loadRelease = async () => {
            setLoading(true);
            const data = await fetchRelease();
            if (data) {
                setRelease(data);
            } else {
                setError("Failed to load genres");
            }
            setLoading(false);
        };

        const loadWrirer = async () => {
            setLoading(true);
            const data = await fetchWrirer();
            if (data) {
                setWrirer(data);
            } else {
                setError("Failed to load genres");
            }
            setLoading(false);
        };

        const loadReadingStatus = async () => {
            setLoading(true);
            const data = await fetchReadingStatus();
            if (data) {
                setReadingStatus(data);
            } else {
                setError("Failed to load genres");
            }
            setLoading(false);
        };



        loadGenre();
        loadCountry();
        loadLanguage();
        loadRelease();
        loadWrirer();
        loadReadingStatus();
    }, []);

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