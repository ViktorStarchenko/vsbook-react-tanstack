import { Form, useActionData, useNavigation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

import Select from "../Select/Select";
import Input from "../elements/Input";
import Modal from "../Modal/Modal";
import ModalSuccess from "../Modal/ModalSuccess";

import { useTaxonomies } from "../../hooks/useTaxonomies";

import CheckboxList from "../Checkbox/CheckboxList";
import CustomCheckbox from "../Checkbox/CustomCheckbox";
import Accordion from "../Accordion/Accordion";
import ImagePicker from "../ImagePicker/ImagePicker";
import ErrorBlock from "../ErrorsBlock/ErrorsBlockList";
import CreateTaxonomy from "./CreateTaxonomy";
import FormRow from "./FormRow";
import {useMutation} from "@tanstack/react-query";
import {postBook} from "../../util/http";
import LoadingIndicator from "../LoadingIndicator";
import FormGroup from "./FormGroup";

export default function BookForm() {
    const [formErrors, setFormErrors] = useState(null); // State for errors
    const dialog = useRef();

    const [createdBook, setCreatedBook] = useState(null);

    const {genre, country, language, release, wrirer, readingStatus, loading, error} = useTaxonomies();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const {mutate, isPending} = useMutation({
        mutationFn: postBook,
        onError: (error) => {
            // If the error contains an error object (e.g. errors), save it
            if (error && error.errors) {
                setFormErrors(error.errors);
            } else {
                setFormErrors({ general: error.message }); // Common error
            }
        },
        onSuccess: (data) => {
            setFormErrors(null); // Clearing errors on successful submission
            if (data.success) {
                console.log("Created post:", data.post);
                setCreatedBook(data.post); // Обновление состояния компонента
                dialog.current.open();
            }
        }
    })

    function handleFormSubmit(event) {
        event.preventDefault();
        setFormErrors(null);
        const formData = new FormData(event.target);
        mutate(formData);
    }

    return (
        <>
            {isPending && <LoadingIndicator />}
            <Modal ref={dialog} title="Book was successfully created">
                {createdBook && <ModalSuccess book={createdBook}/>}
            </Modal>

            <div className="wrapper-1220">
                <Form method="POST" encType="multipart/form-data" onSubmit={handleFormSubmit}>
                    {formErrors&& (
                        <ErrorBlock errors={formErrors}/>
                    )}
                    <div className="formInner">
                        <FormGroup>
                            <Input name="title" type="text" placeholder="Post title"/>

                            <Select name="status" object={[
                                {'id': 'draft', 'name': 'draft'},
                                {'id': 'publish', 'name': 'publish'}
                            ]}/>

                            <ImagePicker id="featured_image" name="featured_image" placeholder="Select book cover"/>

                            <div className="formField">
                                <textarea className="formFieldInput" type="textarea" name="content" placeholder="Content"/>
                            </div>
                        </FormGroup>

                        <FormGroup>
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
                            </FormRow>}
                            {genre && <FormRow><CreateTaxonomy taxonomy="genre"/></FormRow>}
                        </FormGroup>

                        <FormGroup>
                            {country && <FormRow>
                                <Select className="form-input-flex-1" name="country" object={country} emptyValueName="Select book country"/>
                            </FormRow>}
                            {country && <FormRow><CreateTaxonomy taxonomy="country"/></FormRow>}
                        </FormGroup>

                        <FormGroup>
                            {language && <FormRow>
                                <Select className="form-input-flex-1" name="language" object={language} emptyValueName="Select book language"/>
                            </FormRow>}
                            {language && <FormRow><CreateTaxonomy taxonomy="language"/></FormRow>}
                        </FormGroup>

                        <FormGroup>
                            {release && <FormRow>
                                <Select className="form-input-flex-1" name="release" object={release} emptyValueName="Select book release year"/>
                            </FormRow>}
                            {release && <FormRow><CreateTaxonomy taxonomy="release"/></FormRow>}
                        </FormGroup>

                        <FormGroup>
                            {wrirer && <FormRow>
                                <Select className="form-input-flex-1" name="wrirer" object={wrirer} emptyValueName="Select book writer"/>
                            </FormRow>}
                            {wrirer && <FormRow><CreateTaxonomy taxonomy="wrirer"/></FormRow>}
                        </FormGroup>

                        <FormGroup>
                            {readingStatus && <FormRow><Select className="form-input-flex-1" name="reading_status" object={readingStatus} emptyValueName="Select book reading status"/></FormRow>}
                        </FormGroup>

                        <button className="btn btnSubmit">Submit</button>
                    </div>

                </Form>
            </div>

        </>
    )
}