import {useRef, useState} from "react";
import ImagePickerPreview from "./ImagePickerPreview";

export default function ImagePicker({id, name, placeholder}) {
    const [pickedImage, setPickedImage] = useState();
    const imageInput = useRef();

    function handleImageChange(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    function handlePickClick() {
        imageInput.current.click()
    }

    return (
        <>
            <div className="image-picker-wrapper">
                <div className="image-picker-custom">
                    <ImagePickerPreview src={pickedImage} title="Pick your image"/>
                    <button className="btn" type="button" onClick={handlePickClick}>{placeholder ?? 'Pick up the image'}</button>
                </div>
                <input className="image-picker-input" type="file" id={id} name={name} onChange={handleImageChange} ref={imageInput}/>
            </div>
        </>
    )
}