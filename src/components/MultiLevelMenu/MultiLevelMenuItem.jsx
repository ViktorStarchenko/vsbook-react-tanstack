import { useMultiLevelMenuContext } from "./MultiLevelMenu";
import classes from "./MultiLevelMenu.module.css";
import React from "react";
import {NavLink} from "react-router-dom";

export default function MultiLevelMenuItem({ item, isTopLevel }) {
    const { isOpen, openMenu, closeMenu, dropdownItems, dropdownParent, setDropdownParent, topLevelItem, setTopLevelItem } = useMultiLevelMenuContext();

    const isCurrentOpenTopLevel = isTopLevel && isOpen && JSON.stringify(item) === JSON.stringify(topLevelItem);

    function handleClick(item) {
        if (isTopLevel) {
            setTopLevelItem(item);
        }

        if (isTopLevel && dropdownItems === item.children || isCurrentOpenTopLevel) {
            closeMenu();
        } else if (item.children) {
            openMenu(item);
        }
    }

    return (
        <li className={classes.multiLevelMenuItem}>
            {item.children ? (
                <div className={classes.multiLevelMenuLink} onClick={() => handleClick(item)}>
                    {item.title && item.title}

                    {item.children.length > 0 && isTopLevel && <span className={classes.arrow}>{isCurrentOpenTopLevel ? "▲" : "▼"}</span>}
                    {item.children.length > 0 && !isTopLevel && <span className={classes.arrow}>⇾</span>}
                </div>
            ) : (
                <NavLink className={classes.multiLevelMenuLink} to={item.url}>{item.title}</NavLink>
            )}
        </li>
    );
}
