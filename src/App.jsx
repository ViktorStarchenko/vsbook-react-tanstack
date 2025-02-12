import {useContext, useEffect, useState} from 'react';
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { queryClient } from "./util/http";


import router from './router.jsx'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {useDispatch, useSelector} from "react-redux";

import Notification from "./components/Notification/Notification";
import {fetchFavsData, sendFavsData} from "./store/favourite-actions";
import {fetchCartData, sendCartData} from "./store/cart-actions";
import {fetchViewsData, sendViewsData} from "./store/views-action";
import {fetchMainMenuData, sendMainMenuData} from "./store/main-menu-actions";
import ThemeToggle, {useThemeToggleContext} from "./components/ThemeContext";

let isInitial = true;

function App() {
    const routes = router.routes;

    const dispatch = useDispatch();
    const favList = useSelector(state => state.favPosts.favPosts);
    const notification = useSelector(state => state.ui.notification);
    const isFavsChanged = useSelector(state => state.favPosts.changed);

    const isCartChanged = useSelector(state => state.cart.changed);
    const cartItems = useSelector(state => state.cart.items);
    const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);

    const isViewsChanged = useSelector(state => state.views.changed);
    const viewsItems = useSelector(state => state.views.items);

    const isMainMenuChanged = useSelector(state => state.mainMenu.changed);
    const mainMenuItems = useSelector(state => state.mainMenu.items);

    useEffect(() => {
        dispatch(fetchFavsData());
    }, [dispatch])

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        if (isFavsChanged) {
            dispatch(sendFavsData(favList));
        }
    }, [favList, dispatch, isFavsChanged])


    // Cart redux
    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch])

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }
        if (isCartChanged) {
            dispatch(sendCartData(cartItems, cartTotalQuantity));
        }
    }, [cartItems, cartTotalQuantity, dispatch, isCartChanged])

    useEffect(() => {
        dispatch(fetchViewsData());
    }, [dispatch])

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (isViewsChanged) {
            dispatch(sendViewsData(viewsItems));
        }
    }, [viewsItems, isViewsChanged])

    useEffect(() => {
        dispatch(fetchMainMenuData());
    }, [dispatch])

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        if (isMainMenuChanged) {
            dispatch(sendMainMenuData(mainMenuItems))
        }
    }, [mainMenuItems, isMainMenuChanged]);

  return (
    <>
        {notification && <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
        />}

        <ThemeToggle>
            <HelmetProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router}/>
                </QueryClientProvider>
            </HelmetProvider>
        </ThemeToggle>

        {/*<RouterProvider router={router}/>*/}
    </>
  )
}

export default App
