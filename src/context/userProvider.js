"use client"
import { currentUser } from '@/services/userService';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import UserContext from './userContext'

const UserProvider = ({ children }) => {

    const [user, setUser] = useState(undefined);

    // async function load() {
    //     try {
    //         const loadUser = await currentUser();
    //         console.log("calling from user provider=>>>>>>");
    //         console.log(loadUser);
    //         setUser({ ...loadUser });
    //         // console.log(loadUser);
    //     } catch (error) {
    //         console.log("error in loading current user");
    //         console.log(error);
    //         // toast.error("error in loading current user");
    //         setUser(undefined);
    //     }
    // }

    useEffect(() => {
        async function load() {
            try {
                const loadUser = await currentUser();
                console.log("calling from user provider=>>>>>>");
                console.log(loadUser);
                setUser({ ...loadUser });
                // console.log(loadUser);
            } catch (error) {
                console.log("error in loading current user");
                console.log(error);
                // toast.error("error in loading current user");
                setUser(undefined);
            }
        }
        load();
    }, []);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export default UserProvider