"use client"
import UserContext from '@/context/userContext';
import { addHealthChart, getChartByUserId } from '@/services/healthChartService';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

const HealthChart = () => {

    const [selectedRows, setSelectedRows] = useState([]);
    const context = useContext(UserContext);
    const [submitClick, setSubmitClick] = useState(false);




    async function getUserChart(userId) {

        const obj = {
            userId
        }
        try {
            const userTask = await getChartByUserId(obj);


            let list = [];
            for (let i = 0; i < userTask.length; i++) {
                let obj = userTask[i];
                obj.index = i;
                list.push(obj)
            }
            console.log('my list');
            console.log(list);
            setData([...userTask]);
            console.log('Result in use effect-> ');
            console.log(userTask);
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
                            obj[key] = e.target.checked;
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

    const onClickOnItem1 = (e, item, index) => {
        // console.log('item clicked.');
        // console.log(item);
        // console.log('index is ', index);
        // console.log(e.target.name);
        // console.log(e.target.checked);

        if (e.target.name === 'hotWater') {
            const upd_obj = data.map(obj => {

                if (obj.index == index) {
                    obj.hotWater = e.target.checked;
                }
                return obj;
            });

            setData(upd_obj);
        } else if (e.target.name === 'anulomVilom') {
            const upd_obj = data.map(obj => {

                if (obj.index == index) {
                    obj.anulomVilom = e.target.checked;
                }
                return obj;
            });

            setData(upd_obj);
        } else if (e.target.name === 'kapalBhati') {
            const upd_obj = data.map(obj => {

                if (obj.index == index) {
                    obj.kapalBhati = e.target.checked;
                }
                return obj;
            });

            setData(upd_obj);
        } else if (e.target.name === 'exercise') {
            const upd_obj = data.map(obj => {

                if (obj.index == index) {
                    obj.exercise = e.target.checked;
                }
                return obj;
            });

            setData(upd_obj);
        } else if (e.target.name === 'morningWalk') {
            const upd_obj = data.map(obj => {

                if (obj.index == index) {
                    obj.morningWalk = e.target.checked;
                }
                return obj;
            });

            setData(upd_obj);
        } else if (e.target.name === 'eveningWalk') {
            const upd_obj = data.map(obj => {

                if (obj.index == index) {
                    obj.eveningWalk = e.target.checked;
                }
                return obj;
            });

            setData(upd_obj);
        } else if (e.target.name === 'nightWalk') {
            const upd_obj = data.map(obj => {

                if (obj.index == index) {
                    obj.nightWalk = e.target.checked;
                }
                return obj;
            });

            setData(upd_obj);
        }



        // const found = data.find(element => {
        //     return element.index === index;
        // }).hotWater;

        // console.log('what found', found);



    };



    const submitHealthChart = async (event) => {
        event.preventDefault();
        console.log("before send data");
        console.log(data);
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
        const length = data.length;
        const newRow = {
            index: length, anulomVilom: false, kapalBhati: false, exercise: false, hotWater: false, morningWalk: false,
            eveningWalk: false, nightWalk: false, chartDate: new Date()
        }
        setData([...data, newRow]);
    }

    const deleteRow = (index) => {
        console.log("delete clicked", index);
        let list = [];
        list = data.filter((item) => item.index !== index);
        let list1 = [];
        for (let i = 0; i < list.length; i++) {
            let obj = list[i];
            obj.index = i;
            list1.push(obj)
        }
        console.log('after filter and reindex');
        console.log(list1);
        setData([...list1]);
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

                                <td className="px-6 py-4 whitespace-no-wrap border-b">
                                    {item?._id}
                                </td>

                                <td className="px-6 py-4 whitespace-no-wrap border-b">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"


                                        checked={item.anulomVilom}

                                        name="anulomVilom"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.kapalBhati}

                                        name="kapalBhati"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.exercise}

                                        name="exercise"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.hotWater}

                                        name="hotWater"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.morningWalk}

                                        name="morningWalk"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-indigo-600"

                                        checked={item.eveningWalk}

                                        name="eveningWalk"
                                        onChange={(e) => onClickOnItem(e, item, index)}

                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-no-wrap border-b">
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
                    <button  type='submit' className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Submit</button>
                    {/* <button type='reset' onClick={onClickClear} className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 text-white ms-3'>Clear</button> */}
                    <button type='button' onClick={addRow} className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>Add</button>

                </div>
            </form>
        </div>
    );
};

export default HealthChart;
