"use client"
import React from 'react'

const Footer = () => {
    return (
        <footer className='h-40 bg-blue-600 text-white'>
            <div className='flex p-5 justify-around'>
                <div className='text-center flex flex-col justify-center'>
                    <h1>Welcome to Work Manager</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, culpa.</p>
                </div>
                <div className='text-center'>
                    <h1>Important links</h1>
                    <ul>
                        <li><a href='#!'>Facebook</a></li>
                        <li><a href='#!'>YouTube</a></li>
                        <li><a href='#!'>Linkedin</a></li>

                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer