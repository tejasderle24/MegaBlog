import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {

    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1 text-sm'
                htmlFor={props.id}
            >
                {label}</label>}

            <input
                type={type}
                className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />

        </div>
    )
}
)

export default Input
