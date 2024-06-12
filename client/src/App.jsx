import Layout from './pages/Layout/Layout.jsx';
import HomePage from "./pages/HomePage/HomePage.jsx"
import ListPage from "./pages/ListPage/ListPage.jsx"
import SinglePage from './pages/SinglePage/SinglePage.jsx';
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx';

import{
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import ProfileUpdatePage from './pages/ProfileUpdatePage/ProfileUpdatePage.jsx';
import NewPostPage from './pages/NewPostPage/NewPostPage.jsx';

function App() {

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
            element:<SinglePage/>
          },
          {
            path:"/profile",
            element:<ProfilePage/>
          },
          {
            path:"/login",
            element:<Login/>
          },
          {
            path:"/register",
            element:<Register/>
          },
          {
            path:"/updateProfile",
            element:<ProfileUpdatePage/>
          },
          {
            path:"/newPost",
            element:<NewPostPage/>
          }
        ]
    },
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App