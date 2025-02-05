import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from "./pages/Root.jsx";
import HomePage from "./pages/Home.jsx";
import BooksPage from "./pages/Books.jsx";
import BookDetailPage from "./pages/BookDetail.jsx";
import ErrorPage from "./pages/Error";

import { booksLoader, bookDetailLoader, getBearerToken, deleteBookAction } from './booksFunctions';
import NewBookPage from "./pages/NewBook";
import Authentification, { action } from "./pages/Authentification";
import { action as logoutAction } from "./pages/Logout"
import {checkAuthLoader, tokenLoader} from "./util/auth";
import {fetchPost} from "./util/http";

import { loader as fetchPostsHome } from "./pages/Home.jsx";
import { loader as fetchPostsBooks } from "./pages/Books.jsx";
import { loader as fetchPostBook } from "./pages/BookDetail.jsx";
import Favourites from "./pages/Favourites";
import MenuSettings from "./pages/MenuSettings";

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
                // loader: booksLoader
                loader: fetchPostsHome
            },
            {
                path: 'books',
                element: <BooksPage />,
                // loader: booksLoader
                loader: fetchPostsBooks
            },
            {
                path: 'books/page/:page',
                element: <BooksPage />,
                // loader: booksLoader
                loader: fetchPostsBooks
            },
            {
                path: 'books/:bookId',
                id: 'book-detail',
                // loader: bookDetailLoader,
                // loader: fetchPost,
                loader: fetchPostBook,
                children: [
                    {
                        index: true,
                        element: <BookDetailPage />,
                        action: deleteBookAction
                    }
                ]
            },
            {
                path: 'new',
                element: <NewBookPage />,
                // action: postBook,
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
            },
            {
                path: '/favourites',
                element: <Favourites />
            },
            {
                path: '/menu-settings',
                element: <MenuSettings />
            }
        ]
    },

])

export default router;