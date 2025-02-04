import { createSlice } from "@reduxjs/toolkit";

const initialMainMenuSlice = {
    items: [],
    changed: false
}

const mainMenuSlice = createSlice({
    name: 'mainMenu',
    initialState: initialMainMenuSlice,
    reducers: {
        addMenuItem(state, action) {
            console.log(action.payload)
            state.items.push(action.payload);
            state.changed = true;
        },
        replaceMenuItems(state, action) {
            state.items = action.payload;
        }
    }
});

export default mainMenuSlice;
export const mainMenuSliceActions = mainMenuSlice.actions