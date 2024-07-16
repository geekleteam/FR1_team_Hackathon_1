import React, { ChangeEvent, useState } from 'react'
import Input from './FormElements/input'
import { Eye, EyeOff } from 'lucide-react';
import {useLocation,useNavigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import LoginButton from './Auth0/LoginButton';


const initialState = {email:"",password:""}

const Signin = ({setIsLogin}) => {

    const { setAuth } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/dashboard'
 
    const [formData, setFormData] = useState(initialState)
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e) => {

        if (e.target.type === 'checkbox') {
            setFormData(prev => ({ ...prev, [e.target.name]: !!e.target.checked }))
        } else {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }

    }

    const handleSubmit = () => {
        // Account Create Successfull
        setAuth(prev => ({...formData}))
        setFormData(initialState)
        navigate(from, {replace : true});

    }


    return (<>
    <LoginButton/>
    <form onSubmit={(e)=>{e.preventDefault();handleSubmit()}} className = "mt-8 flex flex-col items-center gap-6 lg:max-w-80 min-w-80 ml-auto mr-auto border-[0.5px] shadow-md boder-gray-300 p-6 rounded-xl" >

    <div className="w-full">
        <Input
            label={"Email"}
            type="email"
            id="Email"
            name="email"
            value={formData[`email`]}
            placeholder={"Email"}
            handleChange={handleChange} />
    </div>
    <div className="relative w-full">
        <Input
            label="Password"
            type="password"
            id="Password"
            name="password"
            value={formData['password']}
            placeholder={"********"}
            handleChange={handleChange} />
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

    <div className=" flex flex-col sm:items-center sm:gap-4">
        <button type='submit'
            className="block w-full shrink-0 rounded-md border border-primary-green bg-primary-green px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-hovergreen focus:outline-none focus:ring active:text-hovergreen"
        >
            Login
        </button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            Don't have an account? {" "}
            <a onClick={() => setIsLogin(false)} className="text-link cursor-pointer underline">Create Account</a>
        </p>
    </div>
</form >
</>
  )
}

export default Signin