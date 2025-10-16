import React, { useState } from "react";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { isLogin, loginError, setError, setIsLogin } from "../store/slice/authSlice";
import userAuth from "../appwrite/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const islogin = useSelector(isLogin);
  const login_error = useSelector(loginError);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await userAuth.UserLogin(user);
    dispatch(setIsLogin(response.isSuccess));
    dispatch(setError({loginError: response.error}));
    if (response.isSuccess === true) navigate("/");
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <form
      className="w-full bg-white max-w-sm px-6 pt-6 pb-10 rounded-lg relative"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl text-center font-semibold">
        Login to your Account
      </h1>

      <InputField
        label="Email"
        placeholder="Enter your Email"
        id="email"
        type="text"
        value={user.email}
        name="email"
        setUser={setUser}
      />
      <InputField
        label="Password"
        placeholder="Enter your Password"
        id="password"
        type="password"
        value={user.password}
        name="password"
        setUser={setUser}
      />
      <button
        type="submit"
        className="w-full ml-auto font-semibold bg-blue-500 text-white py-2 rounded-lg my-4 hover:bg-blue-600"
      >
        Login
      </button>
      <p className="text-red-600 font-semibold text-sm absolute bottom-4 ">
        {login_error}
      </p>
    </form>
  );
}

export default Login;
