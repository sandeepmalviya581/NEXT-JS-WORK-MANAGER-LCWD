"use client"
import {  currentUser } from '@/services/userService';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import UserContext from './userContext'

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        async function load() {
            try {
                const loadUser = currentUser();
                setUser({ ...loadUser });
            } catch (error) {
                console.log(error);
                setUser(undefined);
                toast.error("error in loading current user");
            }
        }
        load();
    }, [])





    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export default UserProvider