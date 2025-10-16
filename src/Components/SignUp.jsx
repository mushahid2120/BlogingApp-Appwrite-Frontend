import { useState } from "react";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import {
  isLogin,
  setError,
  setIsLogin,
  signupError,
} from "../store/slice/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import userAuth from "../appwrite/auth";

function SignUp() {
  const islogin = useSelector(isLogin);
  const signup_error=useSelector(signupError)
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });



  const handleSubmit = async(e) => {
    e.preventDefault();
      if(user.password===user.confirmPassword){
        const response=await userAuth.UserSignUp(user)
        dispatch(setIsLogin(response.isSuccess))
        dispatch(setError({signupError: response.error}))
        if(response.isSuccess===true)
          navigate('/')
    }
    else
        {dispatch(setError('Password must be matched!!'))
        return }

    setUser({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  if (islogin === true) return <Navigate to="/" replace />;

  return (
    <form
      className="w-full bg-white max-w-sm px-6  pt-4 py-10 rounded-lg relative"
      onSubmit={handleSubmit}
    >
      <h1 className="text-xl text-center font-semibold">Sign Up</h1>

      <InputField
        label="Name"
        placeholder="Enter your Name"
        id="name"
        type="text"
        value={user.name}
        name="name"
        setUser={setUser}
      />

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
      <InputField
        label="Confirm Password"
        placeholder="Confirm your password"
        id="confirm-password"
        type="password"
        value={user.confirmPassword}
        name="confirmPassword"
        setUser={setUser}
      />

      <button
        type="submit"
        className="w-full ml-auto font-semibold bg-blue-500 text-white py-2 rounded-lg my-4 hover:bg-blue-600"
      >
        SingUp
      </button>
          <p className="text-red-600 font-semibold text-sm absolute bottom-4 ">{signup_error}</p>
    </form>
  );
}

export default SignUp;
