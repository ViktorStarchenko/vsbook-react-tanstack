import {createSlice} from "@reduxjs/toolkit";

const initialfavPostsState = {
    favPosts: []
}

const favPostsSlice = createSlice({
    name: 'favPosts',
    initialState: initialfavPostsState,
    reducers: {
        toggleFavs(state, action) {
            const addedId = action.payload.id;
            const isExists = state.favPosts.some(item => item.id === addedId);

            return {
                ...state,
                favPosts: isExists
                    ? state.favPosts.filter(item => item.id !== addedId)
                    : [...state.favPosts, action.payload],
            };
        }
    }
})

export default favPostsSlice;
export const favPostsActions = favPostsSlice.actions