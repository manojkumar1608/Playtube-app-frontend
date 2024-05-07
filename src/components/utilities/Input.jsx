import React, { useId } from "react";

function Input({
    label,
    className ="",
    type = "text",
    ...props
},ref){
    const id = useId()

  return (
    <div>
        {label && <label className="inline-block pl-1 mb-2 font-bold "
        htmlFor={id}>
            {label} 
            
        </label>}
        <input
        type ={type}
        className={`px-3 py-2 rounded-lg bg-white text-black border border-black focus:bg-gray-50 duration-200 w-full ${className}`}
        id= {id}
        ref= {ref}
        {...props}
        />
        
    </div>
  )
}

export default React.forwardRef(Input)