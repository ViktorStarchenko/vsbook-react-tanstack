import {mainMenuSliceActions} from "../../store/main-menu-slice";
import {useDispatch} from "react-redux";
import Modal from "../Modal/Modal";
import {useRef} from "react";
import FormRow from "../FormItems/FormRow";
import ContentRow from "../ContentItems/ContentRow";
import ContentItem from "../ContentItems/ContentItem";

export default function MenuItemActionRemove({item}) {
    const dispatch = useDispatch();
    const modalRef = useRef();

    function handleOpenModal() {
        modalRef.current.open()
    }

    function handleRemove(item) {
        dispatch(mainMenuSliceActions.removeMenuItem(item))
    }

    return (
        <>
            <span onClick={handleOpenModal}>
                Remove
            </span>
            <Modal ref={modalRef} title={`Are You sure You want to remove this ${item.title} item?`}>
                <ContentRow justifyContent="center">
                    <div className='btn' onClick={() => handleRemove(item)}>Confirm remove</div>
                </ContentRow>
            </Modal>
        </>

    )
}