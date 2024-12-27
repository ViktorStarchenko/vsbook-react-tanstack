import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from "./pages/Root.jsx";
import HomePage from "./pages/Home.jsx";
import BooksPage from "./pages/Books.jsx";
import BookDetailPage from "./pages/BookDetail.jsx";
import ErrorPage from "./pages/Error";

import { booksLoader, bookDetailLoader, getBearerToken, postBook } from './booksFunctions';
import NewBookPage from "./pages/NewBook";
import Authentification, { action } from "./pages/Authentification";
import { action as logoutAction } from "./pages/Logout"
import {checkAuthLoader, tokenLoader} from "./util/auth";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: 'root',
        loader: tokenLoader,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: booksLoader
            },
            {
                path: 'books',
                element: <BooksPage />,
                loader: booksLoader
            },
            {
                path: 'books/page/:page',
                element: <BooksPage />,
                loader: booksLoader
            },
            {
                path: 'books/:bookId',
                element: <BookDetailPage />,
                loader: bookDetailLoader
            },
            {
                path: 'new',
                element: <NewBookPage />,
                action: postBook,
                loader: checkAuthLoader
            },
            {
                path: '/auth',
                element: <Authentification />,
                action: action
            },
            {
                path: '/logout',
                action: logoutAction
            }
        ]
    },

])

export default router;