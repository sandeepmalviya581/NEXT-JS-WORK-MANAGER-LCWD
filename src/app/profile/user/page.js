// pages/profile.js
import UserContext from '@/context/userContext';
import React, { useContext } from 'react';

const ProfilePage = () => {

  const context = useContext(UserContext);


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-1/2">
        <h1 className="text-3xl font-semibold mb-6 text-blue-600">Admin Profile</h1>
        <table className="w-full">
          <tbody>
            <tr className="bg-blue-100">
              <td className="py-3 pr-6 font-semibold text-gray-600">Name:</td>
              <td className="py-3">{context?.name}</td>
            </tr>
            <tr className="bg-green-100">
              <td className="py-3 pr-6 font-semibold text-gray-600">Email:</td>
              <td className="py-3">{context?.email}</td>
            </tr>
            <tr className="bg-yellow-100">
              <td className="py-3 pr-6 font-semibold text-gray-600">Role:</td>
              <td className="py-3">{context?.about}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
