import { createBrowserRouter } from "react-router-dom";
import DeshboardLayout from "../Layout/DeshboardLayout/DeshboardLayout/DeshboardLayout";
import MyBuyers from "../Layout/DeshboardLayout/MyBuyers/MyBuyers";
import MyOrders from "../Layout/DeshboardLayout/MyOrders/MyOrders";
import Main from "../Layout/Main/Main";
import Category from "../Pages/Category/Category/Category";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivetRoute from "./PrivetRoute/PrivetRoute";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>, 
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/home',
                element:<Home></Home>
            },
            {
                path:'/category/:id',
                loader: ({params})=> fetch(`http://localhost:5000/category/${params.id}`),
                element:<PrivetRoute><Category></Category></PrivetRoute>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<Signup></Signup>
            }
        ]
    },
    {
        path:'/deshboard',
        element:<DeshboardLayout></DeshboardLayout>,
        children:[
            {
                path:'/deshboard/myorders',
                element:<MyOrders></MyOrders>
            },
            {
                path:'/deshboard/mybuyers',
                element:<MyBuyers></MyBuyers>
            }
        ]
    }
]);

export default router;