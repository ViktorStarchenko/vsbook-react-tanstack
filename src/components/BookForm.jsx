import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import Select from "./elements/Select";
import classes from './BookForm.module.css';
import Input from "./elements/Input";
import Modal from "./Modal";
import ModalSuccess from "./ModalSuccess";

import { useBooksTaxonomies } from "./hooks/useBooksTaxonomies";
import Checkbox from "./elements/Checkbox";
import CheckboxList from "./Checkbox/CheckboxList";
import CustomCheckbox from "./Checkbox/CustomCheckbox";
import Accordion from "./Accordion/Accordion";
import ImagePicker from "./ImagePicker/ImagePicker";

export default function BookForm() {
    const data = useActionData();
    console.log(data)
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

           <Form method="POST" encType="multipart/form-data">
               {data && data.errors && (
                   <ul className={classes.errorList}>
                       {Object.entries(data.errors).map(([key, error]) => (
                           <li key={key}>{error}</li>
                       ))}
                   </ul>
               )}
               <div className={classes.formInner}>
                   <Input name="title" type="text" placeholder="Post title"/>
                   <Input name="status" type="text" placeholder="Post status"/>
                   {/*<Input name="featured_image" type="file" placeholder="Image"/>*/}
                   <ImagePicker id="featured_image" name="featured_image" placeholder="Select book cover"/>
                   {/*<Input name="image" type="text" placeholder="Post image"/>*/}

                   <div className={classes.formField}>
                       <textarea className={classes.formFieldInput} type="textarea" name="content" placeholder="Content"/>
                   </div>

                   {genre && <Accordion>
                       <Accordion.Item id="accordion-genre">
                           <Accordion.Title className="btn">Genre</Accordion.Title>
                           <Accordion.Content>
                               <CheckboxList id="genre-list">
                                   {genre.map(item => (
                                       <CustomCheckbox key={item.id} id={item.id} label={item.name} name="genre" value={item.id}/>
                                   ))}
                               </CheckboxList>
                           </Accordion.Content>
                       </Accordion.Item>

                   </Accordion>}


                   {/*{genre && <Checkbox name="Genre" id="genre" object={genre}/>}*/}
                   {country && <Select name="country" object={country}/>}
                   {language && <Select name="language" object={language}/>}
                   {release && <Select name="release" object={release}/>}
                   {wrirer && <Select name="wrirer" object={wrirer}/>}
                   {readingStatus && <Select name="reading_status" object={readingStatus}/>}

                   <button className="btn btnSubmit">Submit</button>
               </div>

           </Form>
        </>
    )
}