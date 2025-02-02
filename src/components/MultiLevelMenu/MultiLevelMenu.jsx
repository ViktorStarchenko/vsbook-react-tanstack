import { createContext, useContext, useState, useEffect, useRef } from "react";
import classes from './MultiLevelMenu.module.css';
import MultiLevelMenuItem from "./MultiLevelMenuItem";

const MultiLevelMenuContext = createContext();

export function useMultiLevelMenuContext() {
    const ctx = useContext(MultiLevelMenuContext);
    if (!ctx) {
        throw new Error("Something went wrong with MultiLevelMenuContext");
    }
    return ctx;
}

export default function MultiLevelMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [topLevelItem, setTopLevelItem] = useState({});
    const [dropdownItems, setDropdownItems] = useState([]);
    const [dropdownParent, setDropdownParent] = useState({});
    const [prevState, setPrevState] = useState([]);

    const menuRef = useRef(null);

    const menuData = [
        {
            id: 1,
            title: "Главная",
            link: "/",
        },
        {
            id: 2,
            title: "О нас",
            link: "/about",
            children: [
                {
                    id: 3,
                    title: "Команда",
                    link: "/about/team",
                    children: [
                        { id: 4, title: "Разработчики", link: "/about/team/devs" },
                        { id: 5, title: "Менеджеры", link: "/about/team/managers" },
                    ],
                },
                { id: 6, title: "История", link: "/about/history" },
            ],
        },
        {
            id: 7,
            title: "Контакты",
            link: "/contacts",
            children: [
                {
                    id: 8,
                    title: "Что-то рандомное",
                    link: "/about/team",
                    children: [
                        { id: 9, title: "Уборщики", link: "/about/team/devs" },
                        { id: 10, title: "Доставка", link: "/about/team/managers" },
                    ],
                },
                { id: 11, title: "Еще что-то ", link: "/about/history" },
            ],
        },
    ];

    function openMenu(item) {
        if (item.children) {
            // If the menu is already open at this point, close it
            if (dropdownItems === item.children) {
                closeMenu();
                return;
            }
            setIsOpen(true);
            setPrevState(dropdownItems);
            setDropdownItems(item.children);
            setDropdownParent(item);
        }
    }

    function goBack(items) {
        if (JSON.stringify(topLevelItem.children) == JSON.stringify(dropdownItems)) {
            closeMenu()
        }
        setDropdownItems(items);
    }

    function closeMenu() {
        setIsOpen(false);
        setDropdownItems([]);
    }

    // Закрываем меню при клике вне него
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const contextValue = {
        isOpen,
        openMenu,
        closeMenu,
        dropdownItems,
        dropdownParent,
        setDropdownParent,
        topLevelItem,
        setTopLevelItem
    };

    return (
        <MultiLevelMenuContext.Provider value={contextValue}>
            <div ref={menuRef} className={classes.multiLevelMenu}>
                <div>
                    <ul className={classes.multiLevelMenuNav}>
                        {menuData.map((item, index) => (
                            <MultiLevelMenuItem key={index} item={item} isTopLevel={true}/>
                        ))}
                    </ul>

                    {isOpen && (
                        <div className={classes.multiLevelMenuDropdown}>
                            <div className="wrapper-1220">
                                <ul className={`${classes.multiLevelMenuDropdownList} ${classes.open}`}>
                                    {JSON.stringify(topLevelItem.children) === JSON.stringify(dropdownItems) && <div onClick={closeMenu}>Close</div>}
                                    {JSON.stringify(topLevelItem.children) !== JSON.stringify(dropdownItems) && <div onClick={() => goBack(prevState)}>Back to {dropdownParent.title}</div>}
                                    {dropdownItems.map((item, index) => (
                                        <MultiLevelMenuItem key={index} item={item} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </MultiLevelMenuContext.Provider>
    );
}
