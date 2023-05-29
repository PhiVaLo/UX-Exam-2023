import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import HelloWorld from "./components/HelloWorld/HelloWorld";
import BookingOverview from "./components/BookingOverview/BookingOverview";
import Profile from "./components/Profile/Profile";
import RoomsOverview from "./components/RoomsOverview/RoomsOverview";
import Navigation from "./components/Navigation/Navigation";
import ChooseRoom from "./components/ChooseRoom/ChooseRoom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/Hello",
        element: <HelloWorld/>,
    },
    {
        path: "/RoomsOverview",
        element: <RoomsOverview/>,
    },
    {
        path: "/ChooseRoom",
        element: <ChooseRoom/>,
    },
    {
        path: "/Profile",
        element: <Profile/>,
    },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>);