import React, { ChangeEvent } from 'react'

interface InputProps {
    label?: any,
    id: string,
    name: string,
    type: string,
    value: any,
    placeholder: string,
    handleChange: (e:ChangeEvent<HTMLInputElement>) => any
    otherProps?: any

}

const Input: React.FC<InputProps> = ({ label = null, id, type, name, value, placeholder, handleChange, otherProps = {} }) => {
    return (
        <>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 text-left">
                {label && (label + ` :`)}

                <input {...otherProps}
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-[1px] px-2 placeholder:font-normal font-medium min-h-10 border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
            </label>
        </>
    )
}

export default Input