"use client"
import User from '../show-users/User';

import { getAllUserPagniation } from '@/services/userService';
import { useState, useEffect } from 'react';
import Pagination from './Pagination';

const HomePage = () => {


  async function fetchData(page, searchQuery) {

    let obj = {
      "search": searchQuery,
      "page": page
    }

    try {
      const allUsers = await getAllUserPagniation(obj);
      console.log('->>>>>>>>>>>>>');
      console.log(allUsers);
      return allUsers;

    } catch (error) {
      console.log(error);
    }
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [people, setPeople] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const data = await fetchData(1, searchQuery);
    console.log("data in click serch btton.");
    console.log(data);
    setPeople(data.data);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
    setTotalItems(data.totalCount);
  };

  const handlePageChange = async (newPage) => {
    const data = await fetchData(newPage, searchQuery);
    setPeople(data.data);
    setCurrentPage(data.page);
    setTotalPages(data.totalPages);
    setTotalItems(data.totalCount);
  };

  useEffect(() => {
    fetchData(currentPage, searchQuery)
      .then(data => {
        setPeople(data.data);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages);
        setTotalItems(data.totalCount);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [currentPage, searchQuery]);

  return (
    <div>
      <div className="grid grid-cols-12 mt-3">
        <div className='col-span-6 col-start-4'>
          <h1 className='text-2xl mb-3'>  Users ({totalItems})</h1>

          <div className='flex justify-between'>



            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className=' p-3 rounded-3xl bg-gray-100 focus:ring-gray-400 border-gray-800'

              />
              <button type="submit" className='ml-2 bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' >Search</button>



            </form>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          {
            people.map((t) => (
              <User user={t} key={t._id} />
            ))
          }
        </div>


      </div>








      {/* <div>
        <h2>Total Users {totalItems}</h2>
        {
          people.map((t) => (
            <User user={t} key={t._id} />
          ))
        }
      </div> */}


      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> */}
    </div>
  );
};

export default HomePage;
