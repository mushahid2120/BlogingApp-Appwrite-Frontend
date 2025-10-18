import React from 'react'

export default function ImageView({src,width='w-auto',height='h-auto'}) {
  console.log(src)
  if(src==='')
    return <div className={`${width} ${height} flex justify-center mb-2 bg-slate-200`}></div>
  return (
    <div className={`${width} ${height} flex justify-center mb-2`}>
        <img  className="h-full w-full object-cover" src={src} alt="myimage" />
    </div>
  )
}
