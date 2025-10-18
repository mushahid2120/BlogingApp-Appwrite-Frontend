import { useState } from "react";
import InputField from "../Components/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  isLogin,
  loginError,
  setError,
  setIsLogin,
} from "../store/slice/authSlice";
import userAuth from "../appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
  const dispatch = useDispatch();
  const login_error = useSelector(loginError);
  const navigate = useNavigate();
  const { register, watch, handleSubmit } = useForm();

  const loginSubmit = async (user) => {
    const response = await userAuth.UserLogin(user);
    dispatch(setIsLogin(response.isSuccess));
    dispatch(setError({ loginError: response.error }));
    if (response.isSuccess === true) navigate("/");
  };

  return (
    <main className="min-h-[78vh] flex justify-center items-center my-4">
      <form
        className="w-full bg-white max-w-sm px-6 pt-6 pb-10 rounded-lg relative"
        onSubmit={handleSubmit(loginSubmit)}
      >
        <h1 className="text-xl text-center font-semibold">
          Login to your Account
        </h1>

        <InputField
          label="Email"
          placeholder="Enter your Email"
          type="text"
          {...register("email")}
        />
        <InputField
          label="Password"
          placeholder="Enter your Password"
          type="password"
          {...register("password")}
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
    </main>
  );
}

export default Login;
