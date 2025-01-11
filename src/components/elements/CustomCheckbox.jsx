import {useRef, useState} from "react";

export default function CustomCheckbox() {
    const [isChecked, setIsChecked] = useState()

    const checkbox = useRef()

    function handleChange(event) {
        setIsChecked(event.target.checked);
    }

    return (
        <>
            <div className="custom-checkbox-wrapper">
                <div className="custom-checkbox">
                    <span className={`custom-checkbox-icon ${isChecked ? 'checked' : ''}`}>✔</span>
                </div>
                <input type="checkbox" id="test" name="text" value="test" ref={checkbox} onChange={handleChange}/>
                <label htmlFor="test">Test Checkbox ✔</label>
            </div>
        </>
    )
}