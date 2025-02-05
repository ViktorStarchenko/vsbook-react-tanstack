import {useRef, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import {mainMenuSliceActions} from "../../store/main-menu-slice";

import classes from './MenuForm.module.css'
import MenuFormItem from "./MenuFormItem";
import MenuItemList from "./MenuItemList";

export default function MenuForm() {
    // const [menuItems, setMenuItems] = useState([]);
    const dispatch = useDispatch();

    const menuItems = useSelector(state => state.mainMenu.items || []);

    console.log(menuItems)

    function handleAddItem(newItem) {
        // setMenuItems([...menuItems, newItem]);
        dispatch(mainMenuSliceActions.addMenuItem(newItem));
    }

    return (
        <div className="wrapper-860">
            <h1 className="h1">Manage Menu</h1>
            <MenuFormItem onAdd={handleAddItem} />
            <div className={classes.menuFormListWrapper}>
                <MenuItemList items={menuItems} />
            </div>
        </div>
    );
}

// function MenuFormItem({ onAdd, level = 1 }) {
//     const [title, setTitle] = useState("");
//     const [url, setUrl] = useState("");
//     const [children, setChildren] = useState([]);
//     const [showChildForm, setShowChildForm] = useState(false); // Управляет отображением вложенной формы
//
//     function handleAddChild(newChild) {
//         setChildren((prevChildren) => [...prevChildren, newChild]);
//     }
//
//     function handleSubmit() {
//         if (!title || !url) return;
//         onAdd({ id: Date.now(), title, url, children: children.length ? children : undefined });
//         setTitle("");
//         setUrl("");
//         setChildren([]);
//         setShowChildForm(false); // Скрываем форму после добавления
//     }
//
//     return (
//         <div style={{ marginLeft: level * 20, border: "1px solid #ddd", padding: "10px" }}>
//             <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//             <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
//             <button type="button" onClick={handleSubmit}>Add Item</button>
//
//             <div>
//                 <button type="button" onClick={() => setShowChildForm(!showChildForm)}>
//                     {showChildForm ? "Hide Subitems" : "Add Subitems (Level " + (level + 1) + ")"}
//                 </button>
//
//                 {showChildForm && (
//                     <>
//                         <MenuFormItem onAdd={handleAddChild} level={level + 1} />
//                         <MenuItemList items={children} />
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// }




// NORM 2 LEVELS
// import { useState } from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {mainMenuSliceActions} from "../../store/main-menu-slice";
//
// export default function MenuForm() {
//     // const [menuItems, setMenuItems] = useState([]);
//     const dispatch = useDispatch();
//     const menuItems = useSelector(state => state.mainMenu.items);
//
//     console.log(menuItems)
//     function handleAddItem(newItem) {
//         // setMenuItems([...menuItems, newItem]);
//         dispatch(mainMenuSliceActions.addMenuItem(newItem));
//     }
//
//     return (
//         <div>
//             <h1>Manage Menu</h1>
//             <MenuFormItem onAdd={handleAddItem} />
//             <MenuItemList items={menuItems} />
//         </div>
//     );
// }
//
// function MenuFormItem({ onAdd, level = 1 }) {
//     const [title, setTitle] = useState("");
//     const [url, setUrl] = useState("");
//     const [children, setChildren] = useState([]);
//
//     function handleAddChild() {
//         setChildren([...children, { id: Date.now(), title: "", url: "" }]);
//     }
//
//     function handleChildChange(index, key, value) {
//         setChildren(children.map((child, i) => (i === index ? { ...child, [key]: value } : child)));
//     }
//
//     function handleSubmit(e) {
//         e.preventDefault();
//         if (!title || !url) return;
//         onAdd({ id: Date.now(), title, url, children: children.filter(c => c.title && c.url) });
//         setTitle("");
//         setUrl("");
//         setChildren([]);
//     }
//
//     return (
//         <form onSubmit={handleSubmit} style={{ marginLeft: level * 20, border: "1px solid #ddd", padding: "10px" }}>
//             <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
//             <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} required />
//             <button type="submit">Add Item</button>
//
//             <div>
//                 <h4>Subitems (Level {level + 1})</h4>
//                 {children.map((child, index) => (
//                     <div key={child.id} style={{ marginLeft: 20 }}>
//                         <input type="text" placeholder="Subitem Title" value={child.title}
//                                onChange={(e) => handleChildChange(index, "title", e.target.value)} required />
//                         <input type="text" placeholder="Subitem URL" value={child.url}
//                                onChange={(e) => handleChildChange(index, "url", e.target.value)} required />
//                     </div>
//                 ))}
//                 <button type="button" onClick={handleAddChild}>Add Subitem</button>
//             </div>
//         </form>
//     );
// }
//
// function MenuItemList({ items }) {
//     return (
//         <ul>
//             {items.map((item) => (
//                 <li key={item.id}>
//                     {item.title} - {item.url}
//                     {item.children?.length > 0 && <MenuItemList items={item.children} />}
//                 </li>
//             ))}
//         </ul>
//     );
// }
