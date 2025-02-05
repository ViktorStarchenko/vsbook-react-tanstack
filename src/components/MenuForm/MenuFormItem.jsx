import {useState} from 'react'

import MenuItemList from "./MenuItemList";
import FormGroup from "../FormItems/FormGroup";
import FormRow from "../FormItems/FormRow";
import FormItem from "../FormItems/FormItem";

export default function MenuFormItem({ onAdd, level = 1 }) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [children, setChildren] = useState([]);
    const [showChildForm, setShowChildForm] = useState(false); // Controls the display of a nested form.

    function handleAddChild(newChild) {
        setChildren((prevChildren) => [...prevChildren, newChild]);
    }

    function handleSubmit() {
        if (!title || !url) return;
        onAdd({ id: Date.now(), title, url, children: children.length ? children : undefined });
        setTitle("");
        setUrl("");
        setChildren([]);
        setShowChildForm(false); // Hide the form after adding
    }

    return (
        <div style={{ marginLeft: level * 20, border: "1px solid #ddd", padding: "10px" }}>
            <FormGroup>
                <FormRow>
                    <FormItem flexSizing="1">
                        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </FormItem>
                    <FormItem flexSizing="1">
                        <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
                    </FormItem>
                </FormRow>
            </FormGroup>


            <button type="button" onClick={handleSubmit}>Add Item</button>

            <div>
                <button type="button" onClick={() => setShowChildForm(!showChildForm)}>
                    {showChildForm ? "Hide Subitems" : "Add Subitems (Level " + (level + 1) + ")"}
                </button>

                {showChildForm && (
                    <>
                        <MenuFormItem onAdd={handleAddChild} level={level + 1} />
                        <MenuItemList items={children} />
                    </>
                )}
            </div>
        </div>
    );
}