"use client"
import UserContext from '@/context/userContext';
import { addHealthChart, getChartByUserId } from '@/services/healthChartService';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import Loader from '../customLoader';

const HealthChart = () => {

    const context = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);



    async function getUserChart(userId) {

        const obj = {
            userId
        }
        try {
            const userTask = await getChartByUserId(obj);
            setData([...userTask]);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (context.user) {
            console.log('Called use effect');
            console.log(context);
            console.log(context.user);
            getUserChart(context.user._id);
        }
        setIsLoading(false);

    }, [context.user]);
    const [data, setData] = useState([]);

    const onClickOnItem = (e, item, index) => {

        const upd_obj = data.map((obj, i) => {
            if (i == index) {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (key === e.target.name) {
                            if (e.target.name === 'chartDate' || e.target.name === 'weight') {
                                obj[key] = e.target.value;
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
        setData(upd_obj);
    }

    // function isFloatOrNumber(str) {
    //     // Use parseFloat to check if the string can be converted to a float or number
    //     return !isNaN(parseFloat(str));
    // }

    function isFloatOrNumber(str) {
        const floatRegex = /^[-+]?[0-9]*\.?[0-9]+$/;
        return floatRegex.test(str);
    }


    const submitHealthChart = async (event) => {
        event.preventDefault();
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
            if (item.weight !== '' && item.weight !== null && item.weight !== undefined) {
                if (!isFloatOrNumber(item.weight)) {
                    toast.warn(`${i + 1} No. Weight can not be wrong.`)
                    return;
                }

                const floatWeight = parseFloat(item.weight);
                if (floatWeight > 85) {
                    toast.warn(`${i + 1} No. Weight can not be greter than 85.`)
                    return;
                }
            }



        }
        console.log('submitting data');
        console.log(data);
        try {
            const result = await addHealthChart(data);
            getUserChart(context.user._id);
            toast.success("Chart submitted.");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error.message);
        }
    }

    const addRow = () => {
        const newRow = {
            anulomVilom: false, kapalBhati: false, exercise: false, hotWater: false, morningWalk: false,
            eveningWalk: false, nightWalk: false, chartDate: '', weight: '',anulomVilom: false
        }
        setData([...data, newRow]);
    }

    const deleteRow = (index) => {
        console.log("delete clicked", index);
        const list = data.filter((item, i) => i !== index);
        setData([...list]);
    }

    return (
        <div className="flex justify-center mt-10">
            {isLoading ? <Loader /> : <form action='#!' onSubmit={submitHealthChart}>

                <table className="min-w-full border border-gray-300">
                    <thead>
                        <tr >
                         

                            {/* <th className=" px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                ID
                            </th> */}

                            <th className=" px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Chart Created Date
                            </th>

                            <th className=" px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                            Amritvela
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

                            {/* <th className=" px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                S.No.
                            </th> */}

                            <th className="px-6 py-3 border-b bg-gray-100 text-left text-xs leading-4 font-bold text-gray-500 uppercase tracking-wider">
                                Weight
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.map((item, index) => (
                            <tr key={item._id}>

                             

                                {/* <td className="px-6 py-4 whitespace-no-wrap border-b text-xs">
                                    {item._id}
                                </td> */}


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

                                <td className={`px-6 py-4 whitespace-no-wrap border-b ${item.amritvela ? 'bg-green-300' : 'bg-orange-400'}  `}>
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"


                                        checked={item.amritvela}

                                        name="amritvela"
                                        onChange={(e) => onClickOnItem(e, item, index)}

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

                                {/* <td className={`px-6 py-4 whitespace-no-wrap border-b`}>
                                    <input
                                        type="text"
                                        className="form-checkbox h-8 w-full text-indigo-600"

                                        name="weight"
                                        onChange={(e) => onClickOnItem(e, item, index)}
                                    />
                                </td> */}

                             



                                <td className="px-6 py-4 whitespace-no-wrap border-b">
                                    <button type='button' onClick={() => deleteRow(index)} className='bg-red-400 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Delete</button>
                                </td>

                                {/* <td className="px-6 py-4 whitespace-no-wrap border-b" >
                                    [{index + 1}]{item?._id && item._id.substring(0, 5)}
                                </td> */}

                                <td className='px-1 whitespace-no-wrap border-b'>
                                    <input type="text" id='weight'
                                        name="weight"
                                        value={item.weight}
                                        onChange={(e) => onClickOnItem(e, item, index)}
                                        className='w-16 p-1  bg-gray-100 focus:ring-gray-400 border-gray-800'
                                    />
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='mt-4 flex justify-center space-x-3 mb-2'>
                    <button type='submit'  className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Submit</button>
                    {/* <button type='reset' onClick={onClickClear} className='bg-orange-400 py-2 px-3 rounded-lg hover:bg-red-800 text-white ms-3'>Clear</button> */}
                    <button type='button' onClick={addRow} className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Add</button>

                </div>
            </form>}
        </div>

    );
};

export default HealthChart;
