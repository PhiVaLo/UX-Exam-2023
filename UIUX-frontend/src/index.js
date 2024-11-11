import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import BookingOverview from "./components/BookingOverview/BookingOverview";
import Profile from "./components/Profile/Profile";
import RoomsOverview from "./components/RoomsOverview/RoomsOverview";
import Navigation from "./components/Navigation/Navigation";
import ChooseRoom from "./components/ChooseRoom/ChooseRoom";
import Login from "./components/Login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>, //Need to be login
    },
    {
        path: "/roomsoverview",
        element: <RoomsOverview/>,
    },
    {
        path: "/roomsoverview/room",
        element: <ChooseRoom/>,
    },
    {
        path: "/profile",
        element: <Profile/>,
    },
    {
        path: "/bookingoverview",
        element: <BookingOverview/>,
    },
    {
        path: "/room",
        element: <ChooseRoom/>,
    },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <RouterProvider router={router} />
</React.StrictMode>);