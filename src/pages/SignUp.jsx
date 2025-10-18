import { useState } from "react";
import InputField from "../Components/InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  isLogin,
  setError,
  setIsLogin,
  signupError,
} from "../store/slice/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import userAuth from "../appwrite/auth";
import { useForm } from "react-hook-form";

function SignUp() {
  const islogin = useSelector(isLogin);
  const signup_error = useSelector(signupError);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, register, watch } = useForm();

  console.log(watch());

  console.log(signup_error);

  const signSubmit = async (user) => {
    if (user.password === user.confirmPassword) {
      const response = await userAuth.UserSignUp(user);
      console.log(response);
      dispatch(setIsLogin(response.isSuccess));
      dispatch(setError({ signupError: response.error }));
      if (response.isSuccess === true) navigate("/");
    } else {
      dispatch(setError({ signupError: "Password must be matched!!" }));
      return;
    }
  };

  return (
    <main className="min-h-[78vh] flex justify-center items-center my-4">
      <form
        className="w-full bg-white max-w-sm px-6  pt-4 py-10 rounded-lg relative"
        onSubmit={handleSubmit(signSubmit)}
      >
        <h1 className="text-xl text-center font-semibold">Sign Up</h1>

        <InputField
          label="Name"
          placeholder="Enter your Name"
          type="text"
          {...register("name")}
        />

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
        <InputField
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          {...register("confirmPassword")}
        />

        <button
          type="submit"
          className="w-full ml-auto font-semibold bg-blue-500 text-white py-2 rounded-lg my-4 hover:bg-blue-600"
        >
          SingUp
        </button>
        <p className="text-red-600 font-semibold text-sm absolute bottom-4 ">
          {signup_error}
        </p>
      </form>
    </main>
  );
}

export default SignUp;
