import {createStore} from "redux";
import {configureStore} from "@reduxjs/toolkit";

import favPostsSlice from "./favourite-posts";
import viewedPostsSlice from "./viewed-posts";

const store = configureStore({
    reducer: { recentlyViewed: viewedPostsSlice.reducer, favPosts: favPostsSlice.reducer }
});

export default store
// const viewedPostsReducer = (state = initialState, action) => {
//
//     if (action.type === TOGGLE_VIEWED) {
//         const viewedId = action.payload.id;
//
//         const isViewed = state.recentlyViewed.some(item => item.id === viewedId);
//         console.log(isViewed)
//         return {
//             ...state,
//             recentlyViewed: !isViewed
//                 ? [...state.recentlyViewed, action.payload]
//                 : [...state.recentlyViewed],
//         };
//     }
//
//     return state
// }

