import classes from '../BookForm.module.css';

export default function Input({type, name, placeholder}) {

    return (
        <>
            <div className={classes.formField}>
                <input className={classes.formFieldInput} type={type} name={name} id={name} placeholder={placeholder}/>
            </div>
        </>
    )
}