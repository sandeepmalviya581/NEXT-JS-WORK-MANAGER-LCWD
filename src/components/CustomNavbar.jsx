"use client"
import UserContext from '@/context/userContext';
import { logout } from '@/services/userService';
import Link from 'next/link'
import { useRouter } from "next/navigation";
import React, { useContext } from 'react'
import { toast } from 'react-toastify';

const CustomNavbar = () => {

  const router=useRouter();

  const context = useContext(UserContext);
  // console.log("Custome nav bar --->>>>>>>>>");
  // console.log(context.user);

    async function handleLogout(){
    try {
      const lout = await logout();
      console.log(lout);
      context.setUser(undefined);
      router.push("/login")
    } catch (error) {
      console.log("Failed in logout");
      toast.error("Failed to logout")
    }
  }

  return (
    <nav className='bg-blue-600 h-12 px-2 py-3 flex justify-between items-center text-white'>
      <div className='brand'>
        <h1 className='text-2xl font-semibold'>
          <a href='#!'>Work Manager</a>
        </h1>
      </div>

      {
        context.user && (<div>
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
            <li>
              <Link href={'/healthchart'} className='hover:text-blue-200'>Health Chart</Link>

            </li>
            <li>
              <Link href={'/jira'} className='hover:text-blue-200'>Jira</Link>
            </li>

            <li>
              <Link href={'/examportallist'} className='hover:text-blue-200'>Question</Link>
            </li>

            <li>
              <Link href={'/examportal/exam'} className='hover:text-blue-200'>Exam Paper</Link>
            </li>
            <li>
              <Link href={'/examportal/result'} className='hover:text-blue-200'>Exam Result</Link>
            </li>

            <li>
              <Link href={'/examportal/timetable'} className='hover:text-blue-200'>Time Table</Link>
            </li>

            <li>
              <Link href={'/show-hierarchy'} className='hover:text-blue-200'>Show Hierarchy</Link>
            </li>

            <li>
              <Link href={'/sugarreport'} className='hover:text-blue-200'>Sugar Report</Link>
            </li>

          </ul>
        </div>)
      }
      <div>
        <ul className='flex space-x-3'>

          {
            context.user && (<>
              <li>
                {/* <Link href={'#!'} >{context.user.name}</Link> */}
                <p>{context.user.name}</p>

              </li>
              <li>
                {/* <Link href={'#!'} >Logout</Link> */}
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>)
          }

          {!context.user && (<>
            <li>
              <Link href={'/login'} >Login</Link>
            </li>
            <li>
              <Link href={'/signup'} >Signup</Link>
            </li>
          </>)
          }
        </ul>

      </div>

    </nav>
  )
}

export default CustomNavbar