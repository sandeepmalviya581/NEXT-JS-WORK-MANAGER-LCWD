"use client"
import UserContext from '@/context/userContext';
import { addHealthChart, getChartByUserId } from '@/services/healthChartService';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const HealthChart = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const context = useContext(UserContext);
    const [selectedDate, setSelectedDate] = useState('');




    async function getUserChart(userId) {

        const obj = {
            userId
        }
        try {
            const userTask = await getChartByUserId(obj);


            // let list = [];
            // for (let i = 0; i < userTask.length; i++) {
            //     let obj = userTask[i];
            //     obj.index = i;
            //     list.push(obj)
            // }
            // console.log('my list');
            // console.log(list);
            setData([...userTask]);
            // console.log('Result in use effect-> ');
            // console.log(userTask);
            // console.log('get date');
            // console.log(selectedDate);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (context.user) {
            getUserChart(context.user._id);
        }
    }, [context.user]);
    const [data, setData] = useState([]);


    const toggleRowSelection = (id) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
        // console.log(selectedRows);
    };

    const onClickOnItem = (e, item, index) => {
        // console.log('item clicked.');
        // console.log(item);
        // console.log('index is ', index);
        // console.log(e.target.name);
        // console.log(e.target.checked);

        const upd_obj = data.map((obj, i) => {
            if (i == index) {
                console.log("obj for the index ", i, index);
                console.log(obj);
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        console.log(`${key}: ${obj[key]}`);
                        if (key === e.target.name) {
                            if (e.target.name === 'chartDate') {
                                obj[key] = e.target.value;
                                setSelectedDate(e.target.value);
                            } else {
                                obj[key] = e.target.checked;
                            }
                            return obj;
                        }
                    }
                }
            }
            return obj;
        });
        console.log("After updating", upd_obj);
        setData(upd_obj);
    }


    const submitHealthChart = async (event) => {
        event.preventDefault();
        console.log("before send data");
        console.log(data);

        let tempList = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (item.chartDate === '' || item.chartDate === null || item.chartDate === undefined) {
                toast.warn(`${i + 1} No. Chart Date can not be empty.`)
                return;
            }
            const date = new Date(item.chartDate).toLocaleDateString('en-GB');
            if (tempList.includes(date)) {
                toast.warn(`${i + 1} No. Chart Date can not be duplicate.`)
                return;
            }
            tempList.push(date);

        }
        try {
            const result = await addHealthChart(data);
            console.log("heath chart added");
            console.log(result);
            getUserChart(context.user._id);
            toast.success("Chart submitted.");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error.message);
        }
    }

    const addRow = () => {
        // const length = data.length;
        const newRow = {
            // index: length, 
            anulomVilom: false, kapalBhati: false, exercise: false, hotWater: false, morningWalk: false,
            eveningWalk: false, nightWalk: false, chartDate: ''
        }
        setData([...data, newRow]);
    }

    const deleteRow = (index) => {
        console.log("delete clicked", index);
        // let list = [];
        const list = data.filter((item, i) => i !== index);
        // let list1 = [];
        // for (let i = 0; i < list.length; i++) {
        //     let obj = list[i];
        //     obj.index = i;
        //     list1.push(obj)
        // }
        // console.log('after filter and reindex');
        // console.log(list1);
        setData([...list]);
    }

    return (
        <div className="flex justify-center mt-10">
            <form action='#!' onSubmit={submitHealthChart}>

                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr >
                            <th className=" px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                S.No.
                            </th>

                            <th className=" px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                ID
                            </th>

                            <th className=" px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Chart Created Date
                            </th>



                            <th className=" px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Anulom Vilom
                            </th>
                            <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Kapalbhati
                            </th>
                            <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Excersice
                            </th>
                            <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Hot Water
                            </th>
                            <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Walk After Morning Meal
                            </th>
                            <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Evening Walk
                            </th>
                            <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Walk After Night Meal
                            </th>
                            <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.map((item, index) => (
                            <tr key={item._id}>

                                <td className="px-6 py-4 whitespace-no-wrap border-b" >
                                    {index + 1}
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap border-b text-xs">
                                    {item._id}
                                </td>


                                <td className='text-sm'>

                                    {
                                        item.chartDate && new Date(item.chartDate).toLocaleDateString('en-GB')
                                    }
                                    <input
                                        type="date"
                                        id="date"
                                        name="chartDate"
                                        value={item.chartDate}
                                        // value={selectedDate}



                                        // onChange={handleDateChange}
                                        className="form-checkbox  h-4 w-4  text-indigo-600"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    // className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out focus:outline-none focus:border-indigo-600"

                                    // className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </td>



                                <td className={`px-6 py-4 whitespace-no-wrap border-b ${item.anulomVilom ? 'bg-green-300' : 'bg-orange-400'}  `}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"


                                        checked={item.anulomVilom}

                                        name="anulomVilom"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className={`px-6 py-4 whitespace-no-wrap border-b ${item.kapalBhati ? 'bg-green-300' : 'bg-orange-400'}  `}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.kapalBhati}

                                        name="kapalBhati"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className={`px-6 py-4 whitespace-no-wrap border-b ${item.exercise ? 'bg-green-300' : 'bg-orange-400'}  `}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.exercise}

                                        name="exercise"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className={`px-6 py-4 whitespace-no-wrap border-b ${item.hotWater ? 'bg-green-300' : 'bg-orange-400'}  `}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.hotWater}

                                        name="hotWater"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className={`px-6 py-4 whitespace-no-wrap border-b ${item.morningWalk ? 'bg-green-300' : 'bg-orange-400'}  `}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.morningWalk}

                                        name="morningWalk"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className={`px-6 py-4 whitespace-no-wrap border-b ${item.eveningWalk ? 'bg-green-300' : 'bg-orange-400'}  `}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.eveningWalk}

                                        name="eveningWalk"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className={`px-6 py-4 whitespace-no-wrap border-b ${item.nightWalk ? 'bg-green-300' : 'bg-orange-400'}  `}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.nightWalk}

                                        name="nightWalk"
                                        onChange={(e) => onClickOnItem(e, item, index)}
                                    />
                                </td>






                                <td className="px-6 py-4 whitespace-no-wrap border-b">
                                    <button type='button' onClick={() => deleteRow(index)} className='bg-red-400 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='mt-4 flex justify-center'>
                    <button type='submit' className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Submit</button>
                    {/* <button type='reset' onClick={onClickClear} className='bg-orange-400 py-2 px-3 rounded-lg hover:bg-red-800 text-white ms-3'>Clear</button> */}
                    <button type='button' onClick={addRow} className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Add</button>

                </div>
            </form>
        </div>
    );
};

export default HealthChart;
