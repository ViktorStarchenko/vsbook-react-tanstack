export default function Input({type, name, placeholder}) {

    return (
        <>
            <div className="formField">
                <input className="formFieldInput" type={type} name={name} id={name} placeholder={placeholder}/>
            </div>
        </>
    )
}