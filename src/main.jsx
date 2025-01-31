import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css';
// import './utility.js';

import App from './App.jsx'
import {Provider} from "react-redux";
import store from './store/index'

const defaultState = {
    favsList: []
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "TOGGLE_FAV":
            // Проверяем, есть ли уже postId в favsList
            const isFavorite = state.favsList.includes(action.payload);
            return {
                ...state,
                favsList: isFavorite
                    ? state.favsList.filter((id) => id !== action.payload) // Удаляем, если уже в избранном
                    : [...state.favsList, action.payload], // Добавляем, если еще нет
            };
        default:
            return state;
    }
};
store.subscribe(() => {
    // console.log("Updated state:", store.getState());
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,

)
