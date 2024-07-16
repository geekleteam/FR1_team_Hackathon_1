import React, { ChangeEvent, useEffect, useState } from 'react'
import Input from './FormElements/input'
import { Eye, EyeOff } from 'lucide-react';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';


const Signup = ({ setIsLogin }) => {

    const {setAuth} = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/dashboard'



    const [formData, setFormData] = useState({})
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {

        if (e.target.type === 'checkbox') {
            setFormData(prev => ({ ...prev, [e.target.name]: !!e.target.checked }))
        } else {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }

    }

    const handleSubmit = async(e) => {
        e.preventDefault(); 

        try{

            setAuth(formData)
            navigate(from, {replace : true});

            // const response = await axios.post(`signup`,
            //     JSON.stringify(formData),
            //     {
            //         headers:{"Content-Type":'application/json'}
            //     }
            // )

        }catch(e){

        }
        // Account Create Successfull
        // alert(JSON.stringify(formData))

    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6 ml-auto mr-auto border-[0.5px] shadow-md boder-gray-300 p-6 rounded-xl" >
            <div className="col-span-6 sm:col-span-3">
                <Input
                    label="First Name"
                    type="text"
                    id="FirstName"
                    name="firstName"
                    placeholder={'First Name'}
                    value={formData[`firstName`]}
                    handleChange={handleChange}
                    otherProps={{ required: true }}
                />
            </div>

            <div className="col-span-6 sm:col-span-3">
                <Input
                    label={"Last Name"}
                    type="text"
                    id="LastName"
                    name="lastName"
                    placeholder='Last Name'
                    value={formData[`lastName`]}
                    handleChange={handleChange}
                    otherProps={{ required: true }}
                />
            </div>

            <div className="col-span-6">
                <Input
                    label={"Email"}
                    type="email"
                    id="Email"
                    name="email"
                    value={formData[`email`]}
                    placeholder={"Email"}
                    handleChange={handleChange}
                    otherProps={{ required: true }}
                />
            </div>

            <div className="relative col-span-6 sm:col-span-3">
                <Input
                    label="Password"
                    type={showPassword ? "password" : "text"}
                    id="Password"
                    name="password"
                    value={formData[`password`]}
                    placeholder={"********"}
                    handleChange={handleChange}
                    otherProps={{ required: true }}
                />
                <button
                    type="button"
                    className="absolute inset-y-11 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                    )}
                </button>
            </div>

            <div className="relative col-span-6 sm:col-span-3">
                <Input
                    label="Password Confirmation"
                    type={showPassword ? "password" : "text"}
                    id="PasswordConfirmation"
                    name="passwordConfirmation"
                    value={formData[`passwordConfirmation`]}
                    placeholder={"********"}
                    handleChange={handleChange}
                    otherProps={{ required: true }}
                />
                <button
                    type="button"
                    className="absolute inset-y-11 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                        <Eye className="h-5 w-5 text-gray-500" />
                    )}
                </button>

            </div>

            <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                        type="checkbox"
                        id="MarketingAccept"
                        name="recieveUpdated"
                        checked={formData[`recieveUpdated`] ?? true}
                        onChange={handleChange}
                        className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                    />

                    <span className="text-sm text-gray-700 text-left">
                        I want to receive emails about events, product updates and company announcements.
                    </span>
                </label>
            </div>

            <div className="col-span-6">
                <p className="text-sm text-gray-500">
                    By creating an account, you agree to our {" "}
                    <a href="#" className="underline text-link">terms and conditions</a>
                    {" "} and {" "}
                    <a href="#" className="text-link underline">privacy policy</a>.
                </p>
            </div>

            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                    className="inline-block shrink-0 rounded-md border border-primary-green bg-primary-green px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-hovergreen focus:outline-none focus:ring active:text-hovergreen"
                >
                    Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account? {" "}
                    <a onClick={() => setIsLogin(true)} className="text-link cursor-pointer underline">Log in</a>
                </p>
            </div>
        </form >
    )
}

export default Signup