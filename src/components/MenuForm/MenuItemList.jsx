import {useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {mainMenuSliceActions} from "../../store/main-menu-slice";
import classes from "./MenuForm.module.css";
import Modal from "../Modal/Modal";
import MenuFormEditItem from "./MenuFormEditItem";
import MenuFormAddItem from "./MenuFormAddItem";
import {NavLink} from "react-router-dom";

export default function MenuItemList({items}) {
    const [modalType, setModalType] = useState();
    const [selectedItem, setSelectedItem] = useState(null);
    const modalEditRef = useRef();
    const dispatch = useDispatch();

    function handleOpenEdit(item) {
        setSelectedItem(item);
        setModalType('edit');
        modalEditRef.current.open();
    }
    function handleOpenAddSubItem(item) {
        setSelectedItem(item);
        setModalType('add');
        modalEditRef.current.open();
    }

    function handleRemove(item) {
        dispatch(mainMenuSliceActions.removeMenuItem(item))
    }

    return (
        <ul className={classes.menuFormList}>
            {items.map((item) => (
                <li key={item.id}>
                    <div className={classes.menuFormListInner}>
                        <div className={classes.menuFormListName}>
                            {item.title} -
                            <NavLink to={item.url}>{item.url}</NavLink>
                        </div>
                        <div className={classes.actions}>
                            <span onClick={() => handleOpenEdit(item)}>Edit</span>
                            <span onClick={() => handleRemove(item)} >Remove</span>
                            <span onClick={() => handleOpenAddSubItem(item)} >Add Sub Item</span>
                        </div>
                    </div>
                    {item.children && <MenuItemList items={item.children} />}
                    <Modal ref={modalEditRef}>
                        <div className="h2">{modalType} this item</div>
                        {modalType === 'edit' && selectedItem && <MenuFormEditItem item={selectedItem} modalRef={modalEditRef}/>}
                        {modalType === 'add' && selectedItem && <MenuFormAddItem parentItem={selectedItem} modalRef={modalEditRef}/>}
                    </Modal>
                </li>
            ))}

        </ul>
    );
}