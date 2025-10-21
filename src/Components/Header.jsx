import { Link, NavLink, useNavigate } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import { useDispatch, useSelector } from "react-redux";
import {  isLogin, setIsLogin } from "../store/slice/authSlice";
import { useEffect } from "react";
import userAuth from "../appwrite/auth";

function Header() {
  const islogin = useSelector(isLogin);
  const dispatch=useDispatch()
  const navigate=useNavigate()

  useEffect(()=>{
    const checking=async()=>{
      const resp=await userAuth.isSessionActive()
      dispatch(setIsLogin(resp))
    }
    checking()
  },[])

  return (
    <header className="flex justify-between px-6 py-[10px] font-semibold text-lg max-w-7xl mx-auto shadow-md">
      <Link to="/">
        <img src={reactLogo} alt="react Logo" />
      </Link>
      <nav className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive === true ? "text-blue-600" : ""
          }
        >
          Home
        </NavLink>
        {islogin === true ? (
          <>
            <NavLink
              to="/addpost"
              className={({ isActive }) =>
                isActive === true ? "text-blue-600" : ""
              }
            >
              Add Post
            </NavLink>
            <NavLink
              to="/allpost"
              className={({ isActive }) =>
                isActive === true ? "text-blue-600" : ""
              }
            >
              All Post
            </NavLink>
            <button className="bg-red-600 px-2 text-white rounded-lg hover:bg-red-700"
              onClick={async()=>{
                await userAuth.UserLogout()
                dispatch(setIsLogin(false))
                navigate('/')
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive === true ? "text-blue-600" : ""
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                isActive === true ? "text-blue-600" : ""
              }
            >
              SignUp
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
