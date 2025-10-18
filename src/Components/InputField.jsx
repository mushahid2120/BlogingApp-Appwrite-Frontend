import React, { forwardRef, useId } from "react";
import { useDispatch } from "react-redux";
import { clearError } from "../store/slice/authSlice";

const InputField=forwardRef(( {...props},ref )=>{
  const dispatch=useDispatch()
  const Id=useId()
  return (
    <div className="my-4">
      <label htmlFor={Id} className="block text-lg "> {props.label}
      </label>
      <input
        type={props.type}
        placeholder={props.placeholder}
        required
        htmlFor={Id}
        className="border-solid border-2 border-pink-200 rounded-md text-lg outline-none px-2 py-1 w-full bg-white"
        {...props}
        ref={ref}
      />
    </div>
  );
})

export default InputField;
