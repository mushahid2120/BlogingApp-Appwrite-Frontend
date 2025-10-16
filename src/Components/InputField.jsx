import React from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../store/slice/authSlice";

function InputField({ label, placeholder, id, type,value,name,setUser }) {
  const dispatch=useDispatch()
  return (
    <div className="my-4">
      <label htmlFor={id} className="block text-lg ">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        required
        htmlFor={id}
        className="border-solid border-2 border-pink-200 rounded-md text-lg outline-none px-2 py-1 w-full"
        value={value}
        name={name}
        onChange={(e) => {
          setUser((prevState) => ({ ...prevState, [name]: e.target.value }));
          dispatch(clearError())
        }}
      />
    </div>
  );
}

export default InputField;
