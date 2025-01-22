import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import Select from "../Select/Select";
import classes from './BookForm.module.css';
import Input from "../elements/Input";
import Modal from "../Modal/Modal";
import ModalSuccess from "../Modal/ModalSuccess";

import { useTaxonomies } from "../../hooks/useTaxonomies";
import Checkbox from "../elements/Checkbox";
import CheckboxList from "../Checkbox/CheckboxList";
import CustomCheckbox from "../Checkbox/CustomCheckbox";
import Accordion from "../Accordion/Accordion";
import ImagePicker from "../ImagePicker/ImagePicker";
import ErrorBlock from "../ErrorsBlock/ErrorsBlock";
import {useMutation} from "@tanstack/react-query";
import {createTaxonomyTerm, queryClient} from "../../util/http";
import LoadingIndicator from "../LoadingIndicator";
import CreateTaxonomy from "./CreateTaxonomy";
import FormRow from "./FormRow";

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

    const {genre, country, language, release, wrirer, readingStatus, loading, error} = useTaxonomies();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Modal ref={dialog} title="Book was successfully created">
                {createdBook && <ModalSuccess book={createdBook}/>}
            </Modal>

            <div className="wrapper-1220">
                <Form method="POST" encType="multipart/form-data">
                    {data && data.errors && (
                        <ErrorBlock errors={data.errors}/>
                    )}
                    <div className="formInner">
                        <Input name="title" type="text" placeholder="Post title"/>

                        <Select name="status" object={[
                            {'id': 'draft', 'name': 'draft'},
                            {'id': 'publish', 'name': 'publish'}
                        ]}/>

                        <ImagePicker id="featured_image" name="featured_image" placeholder="Select book cover"/>

                        <div className="formField">
                            <textarea className="formFieldInput" type="textarea" name="content" placeholder="Content"/>
                        </div>

                        {genre && <FormRow>
                            <Accordion>
                                <Accordion.Item id="accordion-genre">
                                    <Accordion.Title className="btn">Genre</Accordion.Title>
                                    <Accordion.Content>
                                        <CheckboxList id="genre-list">
                                            {genre.map(item => (
                                                <CustomCheckbox key={item.id} id={item.id} label={item.name}
                                                                name="genre" value={item.id}/>
                                            ))}
                                        </CheckboxList>
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion>
                            <CreateTaxonomy taxonomy="genre"/>
                        </FormRow>}


                        {/*{genre && <Checkbox name="Genre" id="genre" object={genre}/>}*/}
                        {country && <FormRow>
                            <Select className="form-input-50" name="country" object={country} emptyValueName="Select book country"/>
                            <CreateTaxonomy taxonomy="country"/>
                        </FormRow>}

                        {language && <FormRow>
                            <Select className="form-input-50" name="language" object={language} emptyValueName="Select book language"/>
                            <CreateTaxonomy taxonomy="language"/>
                        </FormRow>}

                        {release && <FormRow>
                            <Select className="form-input-50" name="release" object={release} emptyValueName="Select book release year"/>
                            <CreateTaxonomy taxonomy="release"/>
                        </FormRow>}

                        {wrirer && <FormRow>
                            <Select className="form-input-50" name="wrirer" object={wrirer} emptyValueName="Select book writer"/>
                            <CreateTaxonomy taxonomy="wrirer"/>
                        </FormRow>}

                        {readingStatus && <Select name="reading_status" object={readingStatus} emptyValueName="Select book reading status"/>}

                        <button className="btn btnSubmit">Submit</button>
                    </div>

                </Form>
            </div>

        </>
    )
}