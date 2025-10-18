import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
const Home=lazy(()=>import('./pages/Home.jsx'))
const SignUp=lazy(()=>import('./pages/SignUp.jsx'))
const Login=lazy(()=>import('./pages/Login.jsx'))
const AddPost =lazy(()=>import('./pages/AddPost.jsx'))
const AllPost = lazy(()=>import('./pages/AllPost.jsx'))
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from './App.jsx'
import Blog from "./pages/Blog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Provider store={store}><App /></Provider>,
    errorElement: <h1>Error Coming</h1>,
    children:[
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/signup',
        element: <SignUp/>
      },
      {
        path: '/addpost',
        element: <AddPost/>
      },
      {
          path: '/allpost',
          element: <AllPost/>
      },
      {
        path: '/:blog',
        element: <Blog/>
      }

    ]
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <StrictMode>
      <App />
    </StrictMode>
  </RouterProvider>
);
