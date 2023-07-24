"use client"
import Link from 'next/link'
import React from 'react'

const CustomNavbar = () => {
  return (
    <nav className='bg-blue-600 h-12 px-2 py-3 flex justify-between items-center text-white'>
      <div className='brand'>
        <h1 className='text-2xl font-semibold'>
          <a href='#!'>Work Manager</a>
        </h1>
      </div>
      <div>
        <ul className='flex space-x-5'>
          <li>
            <Link href={'/'} className='hover:text-blue-200' >Home</Link>
          </li>
          <li>
            <Link href={'/add-task'} className='hover:text-blue-200'>Add Tasks</Link>

          </li>
          <li>
          <Link href={'/show-tasks'} className='hover:text-blue-200'>Show Tasks</Link>

          </li>
        </ul>

      </div>
      <div>
        <ul className='flex space-x-3'>
          <li>
            <a href="#!">Login</a>
          </li>
          <li>
            <a href="#!">Signup</a>
          </li>
        </ul>

      </div>

    </nav>
  )
}

export default CustomNavbar