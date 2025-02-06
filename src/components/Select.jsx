import React from 'react'
import { useId } from "react"

function Select({
    options,
    label,
    className,
    ...props

}, ref) {

    const id = useId()
    return (
        <div className="w-full">
            {label && <label
                className='inline-block mb-1 pl-1 text-sm'
                htmlFor={props.id}>
            </label>
            }
            <select id={id}
                {...props}
                ref={ref}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${className}`}  
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}

            </select>
        </div>
    )
}

export default React.forwardRef (Select)
