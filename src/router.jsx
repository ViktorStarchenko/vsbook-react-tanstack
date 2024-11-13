import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from "./pages/Root.jsx";
import HomePage from "./pages/Home.jsx";
import BooksPage from "./pages/Books.jsx";
import BookDetailPage from "./pages/BookDetail.jsx";
import ErrorPage from "./pages/Error";

import { booksLoader, bookDetailLoader, getBearerToken, postBook } from './booksFunctions';
import NewBookPage from "./pages/NewBook";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
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
                action: postBook
            }
        ]
    },

])

export default router;