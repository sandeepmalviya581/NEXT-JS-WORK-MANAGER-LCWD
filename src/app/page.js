// pages/index.js
"use client"
import React, { useState, useEffect } from 'react';
import Loader from './customLoader';
import data from './utility/dashboard';
import Link from 'next/link'
import { getAllCount, login } from '@/services/userService';


export const metadata = {
  title: "Home: Work Manager"
}

export default function Home() {



  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState(data);

  const getCount = async () => {
    try {
      const result = await getAllCount();

      const updateList = list.map((item) => {
        if (item.type === 'other') {

          if (item.id === 1) {
            item.count = result.totalUser;
          } else if (item.id === 2) {
            item.count = result.totalUserTask;
          }
        }

        return item;

      });
      setList(updateList);
      console.log(result);
    } catch (error) {

    }

  }


  useEffect(() => {
    getCount();
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 500);
    setIsLoading(false);


  }, []);

  return (
    <div className="p-8">
      <div>
        {isLoading ? <Loader /> : <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">ID</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Link</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">
            {list.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.type === 'link' ? <Link href={item.link} className='hover:text-blue-200' >{item.name}</Link>
                    : item.count
                  }

                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>

    </div>
  );
};


