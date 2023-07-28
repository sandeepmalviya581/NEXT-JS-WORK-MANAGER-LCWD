"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import loginSvg from '../../assets/login.svg'
import { toast } from 'react-toastify';
import { checkEmpty, toastWarn } from '@/helper/utility'
import { addUser } from '@/services/userService';



const Signup = () => {

  const [user, setUser] = useState({
    name: "", email: "", password: "", about: ""
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


  const handleAddUser = async (event) => {
    event.preventDefault();
    try {
      if (checkEmpty(user.name)) {
        toastWarn("Name can not be empty.");
        return;
      } else if (checkEmpty(user.email)) {
        toastWarn("Email can not be empty.");
        return;
      } else if (checkEmpty(user.password)) {
        toastWarn("Password can not be empty.");
        return;
      } else if (checkEmpty(user.about)) {
        toastWarn("About can not be empty.");
        return;
      }
      const result = await addUser(user);
      toastSuccess(`User "${result.name}" added successfully.`);
      setUser({
        name: "", email: "", password: "", about: ""
      })

    } catch (error) {
      console.log(error);
      toastError(error.response.data.error.message);
    }

  }

  const onClickClear = () => {
    setUser({
      name: "", email: "", password: "", about: ""
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
        <h1 className='text-2xl text-center' >Add your user here</h1>
        <form action='#!' onSubmit={handleAddUser}>
          <div >
            <lable htmlFor='user_name' className="block text-sm font-medium mb-2">Name</lable>
            <input type="text" id='user_name'

              name="user_name"
              onChange={(event) => {
                setUser({
                  ...user,
                  name: event.target.value
                });
              }}
              value={user.name}
              className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
            />
          </div>

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

          <div className='mt-4'>

            <lable htmlFor='user_about' className="block text-sm font-medium mb-2">About</lable>
            <textarea id='user_about' rows={2}
              name="user_about"
              onChange={(event) => {
                setUser({
                  ...user,
                  about: event.target.value
                });
              }}
              value={user.about}
              className='w-full p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'
            />

          </div>





          <div className='mt-4 flex justify-center'>
            <button type='submit' className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Add User</button>
            <button type='reset' onClick={onClickClear} className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 text-white ms-3'>Clear</button>

          </div>

        </form>
      </div>

    </div>
  )
}

export default Signup