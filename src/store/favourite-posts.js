import {createSlice} from "@reduxjs/toolkit";

const initialfavPostsState = {
    favPosts: [],
    loading: false
}

const favPostsSlice = createSlice({
    name: 'favPosts',
    initialState: initialfavPostsState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        toggleFavs(state, action) {
            const addedId = action.payload.id;
            const isExists = state.favPosts.some(item => item.id === addedId);

            // return {
            //     ...state,
            //     favPosts: isExists
            //         ? state.favPosts.filter(item => item.id !== addedId)
            //         : [...state.favPosts, action.payload],
            // };
            state.favPosts = isExists
                ? state.favPosts.filter(item => item.id !== addedId)
                : [...state.favPosts, action.payload];
        }
    }
})

export default favPostsSlice;
export const favPostsActions = favPostsSlice.actions