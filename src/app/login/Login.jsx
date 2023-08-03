"use client"
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import loginSvg from '../../assets/login.svg'
import { toast } from 'react-toastify';
import { checkEmpty } from '@/helper/utility'
import { login } from '@/services/userService';
import { useRouter } from "next/navigation";
import UserContext from '@/context/userContext';



const Login = () => {

    const router=useRouter();
    const context = useContext(UserContext);
    const [user, setUser] = useState({
        email: "", password: ""
    });

    const toastWarn = (value) => {
        toast.warn(value, {
            position: 'top-right'
        });
    }

    const toastError = (value) => {
        toast.error(value, {
            position: 'top-right'
        });
    }

    const toastSuccess = (value) => {
        toast.success(value, {
            position: 'top-right'
        });
    }


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            if (checkEmpty(user.email)) {
                toastWarn("Email can not be empty.");
                return;
            } else if (checkEmpty(user.password)) {
                toastWarn("Password can not be empty.");
                return;
            }
            const result = await login(user);
            console.log(result);
            setUser({
                email: "", password: ""
            });
            context.setUser(result.user);
            router.push("/");
            toastSuccess(`User "${result.name}" logged in successfully.`);

        } catch (error) {
            console.log(error);
            toastError("Invalid credentials");
        }

    }

    const onClickClear = () => {
        setUser({
            email: "", password: ""
        })
    }


    return (
        <div className='grid grid-cols-12 justify-center'>
            <div className='col-span-6 col-start-4 p-3 shadow-sm'>
                <div className=' flex justify-center'>
                    <Image
                        alt='login_svg'
                        src={loginSvg} style={{
                            width: '30%'
                        }} />
                </div>
                <h1 className='text-2xl text-center' >Login here</h1>
                <form action='#!' onSubmit={handleLogin}>
                    <div className='mt-4'>
                        <lable htmlFor='user_email' className="block text-sm font-medium mb-2">Email</lable>
                        <input type="email" id='user_email'

                            name="user_email"
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    email: event.target.value
                                });
                            }}
                            value={user.email}
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        />
                    </div>

                    <div className='mt-4'>
                        <lable htmlFor='user_password' className="block text-sm font-medium mb-2">Password</lable>
                        <input type="password" id='user_password'

                            name="user_password"
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    password: event.target.value
                                });
                            }}
                            value={user.password}
                            className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
                        />
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <button type='submit' className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Login</button>
                        <button type='reset' onClick={onClickClear} className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 text-white ms-3'>Clear</button>

                    </div>

                </form>
            </div>

        </div>
    )
}

export default Login