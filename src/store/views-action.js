import {viewsSliceActions} from "./views-slice";
import {favPostsActions} from "./favourite-slice";

export const fetchViewsData = () => {
    return async (dispatch) => {
        dispatch(favPostsActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const fetchData = async ()=> {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/views.json');

            if (!response.ok) {
                throw new Error('Sending views failed');
            }

            const responseData = await response.json();

            return responseData;
        }

        try {
            const data = await fetchData();
            dispatch(viewsSliceActions.replaceViewsItems(data || []))
        } catch (error) {
            dispatch(favPostsActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Sending views data failed!'
            }))
        }
    }
}

export const sendViewsData = (viewsItems) => {
    return async (dispatch) => {
        dispatch(favPostsActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }))

        const sendRequest = async () => {
            const response = await fetch('https://vsbookcollection-b2868-default-rtdb.firebaseio.com/views.json', {
                method: 'PUT',
                body: JSON.stringify(viewsItems)
            })

            if (!response.ok) {
                throw new Error('Sending views failed');
            }

            const responseData = await response.json();
        }


        try {
            await sendRequest();
            dispatch(favPostsActions.showNotification({
                status: 'success',
                title: 'Success...',
                message: 'Sent views data successfully!'
            }))
        } catch (error) {
            dispatch(favPostsActions.showNotification({
                status: 'error',
                title: 'Error...',
                message: 'Sending views data failed!'
            }))
        }


    }
}