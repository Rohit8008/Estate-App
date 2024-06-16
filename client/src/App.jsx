import HomePage from "./pages/HomePage/HomePage.jsx"
import ListPage from "./pages/ListPage/ListPage.jsx"
import SinglePage from './pages/SinglePage/SinglePage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import ProfileUpdatePage from './pages/ProfileUpdatePage/ProfileUpdatePage.jsx';
import NewPostPage from './pages/NewPostPage/NewPostPage.jsx';
import {Layout, RequireAuth } from './pages/Layout/Layout.jsx';

import { useEffect } from 'react';
import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { singlePageLoader } from "./lib/loaders.js";

function App() {
function disableInspect(){

  useEffect(() => {
    const handleEvent = (e) => {
      const keyCode = e.keyCode;
      const isCtrlShift = e.ctrlKey && e.shiftKey;

      if (
        e.type === 'contextmenu' || // Disable right-click
        keyCode === 123 || // Disable F12
        (isCtrlShift && ['I', 'J', 'C'].includes(String.fromCharCode(keyCode))) || // Disable Ctrl+Shift+I, J, C
        (e.ctrlKey && keyCode === 'U'.charCodeAt(0)) // Disable Ctrl+U
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleEvent);
    document.addEventListener('keydown', handleEvent);

    return () => {
      document.removeEventListener('contextmenu', handleEvent);
      document.removeEventListener('keydown', handleEvent);
    };
  }, []);
}

//Will UnComment when the website is fully ready
// disableInspect();

  const router = createBrowserRouter([
    {
      path: "/",
      element: 
        <Layout />,
        children:[
          {
            path:"/",
            element:<HomePage/>
          },
          {
            path:"/list",
            element:<ListPage/>
          },
          {
            path:"/:id",
            element:<SinglePage/>,
            loader:singlePageLoader,
          },
          {
            path:"/login",
            element:<Login/>
          },
          {
            path:"/register",
            element:<Register/>
          },
        ]
    },
    {
      path:"/",
      element:<RequireAuth/>,
      children:[
        {
          path:"/profile",
          element:<ProfilePage/>
        },
        {
          path:"/profile/update",
          element:<ProfileUpdatePage/>
        },
        {
          path:"/add",
          element:<NewPostPage/>
        },
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App