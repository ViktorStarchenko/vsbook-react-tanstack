import { useEffect, useState } from 'react';
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { queryClient } from "./util/http";


import router from './router.jsx'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {useDispatch, useSelector} from "react-redux";

import Notification from "./components/Notification";
import {fetchFavsData, sendFavsData} from "./store/favourite-actions";
import {fetchCartData, sendCartData} from "./store/cart-actions";
import {fetchViewsData, sendViewsData} from "./store/views-action";

let isInitial = true;

function App() {
    const routes = router.routes;

    const dispatch = useDispatch();
    const favList = useSelector(state => state.favPosts.favPosts);
    const notification = useSelector(state => state.favPosts.notification);
    const isFavsChanged = useSelector(state => state.favPosts.changed);

    const isCartChanged = useSelector(state => state.cart.changed);
    const cartItems = useSelector(state => state.cart.items);
    const cartTotalQuantity = useSelector(state => state.cart.totalQuantity);

    const isViewsChanged = useSelector(state => state.views.changed);
    const viewsItems = useSelector(state => state.views.items);

    useEffect(() => {
        dispatch(fetchViewsData());
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
        dispatch(fetchCartData());
    }, [dispatch])

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            return;
        }

        console.log(isViewsChanged)
        console.log(viewsItems)

        if (isViewsChanged) {
            dispatch(sendViewsData(viewsItems));
        }
    }, [viewsItems, isViewsChanged])

  return (
    <>
        {notification && <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
        />}
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}/>
            </QueryClientProvider>
        </HelmetProvider>
        {/*<RouterProvider router={router}/>*/}
    </>
  )
}

export default App
