import {favPostsActions} from "./favourite-slice";
import {cartSliceActions} from "./cart-slice";

export const fetchCartData = () => {
    return async (dispatch) => {
        dispatch(favPostsActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const fetchData = async ()=> {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/cart.json');

            if (!response.ok) {
                throw new Error('Sending cart failed');
            }

            const responseData = await response.json();

            return responseData;
        }

        try {
            const data = await fetchData();
            const cartData = {
                items: data.items || [],
                totalQuantity: data.totalQuantity || 0
            }
            dispatch(cartSliceActions.replaceCart(cartData || []))
        } catch (error) {
            dispatch(favPostsActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Sending favs data failed!'
            }))
        }
    }
}

export const sendCartData = (cart, cartTotalQuantity) => {
    return async (dispatch) => {
        dispatch(favPostsActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify({items: cart, totalQuantity: cartTotalQuantity})
            })

            if (!response.ok) {
                throw new Error('Sending cart failed');
            }

            const responseData = await response.json();
        }


        try {
            await sendRequest();
            dispatch(favPostsActions.showNotification({
                status: 'success',
                title: 'Success...',
                message: 'Sent cart data successfully!'
            }))
        } catch (error) {
            dispatch(favPostsActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Sending favs data failed!'
            }))
        }


    }
}