import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HelloWorld from "./components/HelloWorld/HelloWorld";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/Hello",
        element: <HelloWorld/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>);