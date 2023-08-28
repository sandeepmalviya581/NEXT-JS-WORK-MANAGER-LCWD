// pages/index.js
"use client"
import React, { useState, useEffect } from 'react';
import Loader from './customLoader';
import data from './utility/dashboard';


export const metadata = {
  title: "Home: Work Manager"
}

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Simulate loading for demonstration
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);


  // const Loader = () => (
  //   <div className={`${styles.loaderContainer} ${styles.blur}`}>
  //     <div className={styles.loader}></div>
  //   </div>
  // )


  const Loader1 = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
    </div>
  );

  const Loader2 = () => (
    <div className="flex items-center justify-center h-screen">
      <svg className="animate-spin h-12 w-12 text-blue-500" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0v1a10 10 0 0010 10v-4H8z"
        />
      </svg>
    </div>
  );

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
            {data.map(item => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.link}</td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>

    </div>
  );
};


