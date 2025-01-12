import { forwardRef, useImperativeHandle, useRef } from 'react'

import classes from './Modal.module.css'


const Modal = forwardRef(function Modal({title, children}, ref) {

    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return (
        <>
            <dialog ref={dialog} className={classes.resultModal}>
                <h2>{title}</h2>
                {children}
                <form method="dialog">
                    <button>Close</button>
                </form>
            </dialog>
        </>
    )
});

export default Modal;