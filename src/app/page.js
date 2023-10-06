// pages/index.js
"use client"
import React, { useState, useEffect } from 'react';
import Loader from './customLoader';
import data from './utility/dashboard';
import Link from 'next/link'
import { getAllCount, login } from '@/services/userService';
import { bktblcntAPI, takeAllTableBk } from '@/services/healthChartService';


// export const metadata = {
//   title: "Home: Work Manager"
// }

export default function Home() {



  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState(data);
  const [backupRes, setBackupRes] = useState({
    userCount: 0,
    taskCount: 0,
    healthChartCount: 0
  });

  const [cList, setcList] = useState([]);



  const takeBackupFunc = async () => {

    try {
      const result = await takeAllTableBk();
      // setBackupRes(result.result);
      callCountAPI();

    } catch (error) {
      console.log(error);
    }

  }

  const callCountAPI = async () => {

    try {
      const bkCountRes = await bktblcntAPI();
      setcList(bkCountRes);
    } catch (error) {
      console.log(error);
    }

  }

  const getCount = async () => {
    try {
      const result = await getAllCount();

      // const bkCountRes = await bktblcntAPI();
      // setcList(bkCountRes);

      callCountAPI();

      const updateList = list.map((item) => {
        if (item.type === 'other') {

          if (item.id === 1) {
            item.count = result.totalUser;
          } else if (item.id === 2) {
            item.count = result.totalUserTask;
          } else if (item.id === 6) {


            //  const firstOjb=  result.userTaskGroup[0];
            //  let custRes='';
            //  if(firstOjb._id==='pending'){
            //   custRes=`Pending ${count} `
            //  } if(firstOjb._id==='completed'){
            //   custRes+=custRes`Completed ${count} `
            //  }

            if (result.userTaskGroup.length === 1) {
              item.count = `${result.userTaskGroup[0]._id} : ${result.userTaskGroup[0].count}`
            } else {
              item.count = `${result.userTaskGroup[0]._id} : ${result.userTaskGroup[0].count}  ${result.userTaskGroup[1]._id} : ${result.userTaskGroup[1].count}`
            }


            // item.count= JSON.stringify(result.userTaskGroup);
          }
        }

        return item;

      });
      console.log('updated count list', updateList);
      setList(updateList);
    } catch (error) {
      console.log(error);
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
                    : item.type === 'button' ?
                      <button type="button" onClick={() => takeBackupFunc()} className='ml-2 bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Take Bacup</button>

                      : item.count
                  }

                </td>

                {/* <td className="px-6 py-4 whitespace-nowrap">
                  {item.type === 'button' ? <button >Test</button>
                    : ''
                  }

                </td> */}
              </tr>
            ))}
          </tbody>
        </table>}

      </div>
      <div>
        {/* {JSON.stringify(backupRes)} */}


        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Table Name</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Orignal Table</th>
              <th className="px-6 py-3 bg-gray-100 text-left text-sm font-semibold text-gray-600 uppercase">Backup Table</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-300">


            {cList.map(item => (
              <tr key={item.tableName}>
                <td className={`px-6 py-4 whitespace-nowrap ${item.current === item.bk ? 'bg-green-200' : 'bg-red-200'}`}>{item.tableName}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${item.current === item.bk ? 'bg-green-200' : 'bg-red-200'}`}>{item.current}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${item.current === item.bk ? 'bg-green-200' : 'bg-red-200'}`}>{item.bk}</td>
              </tr>
            ))}




          </tbody>
        </table>

      </div>

    </div >
  );
};


