import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
const Home=lazy(()=>import('./Components/Home.jsx'))
const SignUp=lazy(()=>import('./Components/SignUp.jsx'))
const Login=lazy(()=>import('./Components/Login.jsx'))
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from './App.jsx'

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
