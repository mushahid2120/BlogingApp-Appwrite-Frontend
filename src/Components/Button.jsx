import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Button({buttonName,bgColor,...props}) {
  return (
    <button className={`${bgColor} px-3 rounded-md `} 
        {...props}
      >{buttonName}</button>
  )
}
