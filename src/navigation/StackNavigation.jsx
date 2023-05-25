import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Outlet,
} from "react-router-dom";
import Home from '../Pages/Home';
import Shop from '../Pages/Shop';
import ViewProduct from '../Pages/ViewProduct';
import Gallery from '../Pages/Gallery';
import Cart from '../Pages/Cart';
import NavBar from '../components/NavBar';
import Login from "../authentication/Login"
import Footer from '../components/Footer';
import UserInformation from '../Pages/UserInformation';
import Create from '../admin/Create';
import Management from '../admin/Management';

const Layout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    );
};
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/shop",
                element: <Shop />,
            },
            {
                path: "/gallery",
                element: <Gallery />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/user",
                element: <UserInformation />
            },
            {
                path: "/admin/create",
                element: <Create />
            },
            {
                path:"/view/:id",
                element: <ViewProduct/>
            },
            {
                path:"/management",
                element: <Management/>
            }

        ]
    }
])
const StackNavigation = () => {
    return (
        <RouterProvider router={router} />
    );
};

export default StackNavigation;