"use client"
// import React, { useState, useEffect } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import JiraTasks from './JiraTasks'
// import { getAllJiraTaskAPI } from '@/services/jiraService';

// const tasks = [
//     { id: "1", content: "First task" },
//     { id: "2", content: "Second task" },
//     { id: "3", content: "Third task" },
//     { id: "4", content: "Fourth task" },
//     { id: "5", content: "Fifth task" }
// ];



// const taskStatus = {
//     backlog: {
//         name: "Backlog",
//         items: []
//     },
//     blocked: {
//         name: "Blocked",
//         items: []
//     },
//     inProgress: {
//         name: "In Progress",
//         items: []
//     },
//     codeReview: {
//         name: "Code Review",
//         items: []
//     },
//     testing: {
//         name: "Testing",
//         items: []
//     },
//     done: {
//         name: "Done",
//         items: []
//     }
// };

// const onDragEnd = (result, columns, setColumns) => {
//     if (!result.destination) return;
//     const { source, destination } = result;

//     if (source.droppableId !== destination.droppableId) {
//         const sourceColumn = columns[source.droppableId];
//         const destColumn = columns[destination.droppableId];
//         const sourceItems = [...sourceColumn.items];
//         const destItems = [...destColumn.items];
//         const [removed] = sourceItems.splice(source.index, 1);
//         destItems.splice(destination.index, 0, removed);
//         setColumns({
//             ...columns,
//             [source.droppableId]: {
//                 ...sourceColumn,
//                 items: sourceItems
//             },
//             [destination.droppableId]: {
//                 ...destColumn,
//                 items: destItems
//             }
//         });
//     } else {
//         const column = columns[source.droppableId];
//         const copiedItems = [...column.items];
//         const [removed] = copiedItems.splice(source.index, 1);
//         copiedItems.splice(destination.index, 0, removed);
//         setColumns({
//             ...columns,
//             [source.droppableId]: {
//                 ...column,
//                 items: copiedItems
//             }
//         });
//     }
// };

// const JiraApp = () => {


//     const [columns, setColumns] = useState([]);


//     const getAllJiraTasks = async () => {
//         try {

//             const result = await getAllJiraTaskAPI();
//             result.forEach(element => {
//                 for (const key in taskStatus) {
//                     if (element.status === key) {
//                         const obj = {
//                             id: element._id,
//                             content: element.summary
//                         }
//                         if (key == 'backlog') {
//                             taskStatus.backlog.items.push(obj);
//                         } else if (key == 'blocked') {
//                             taskStatus.blocked.items.push(obj);
//                         }
//                         else if (key == 'inProgress') {
//                             taskStatus.inProgress.items.push(obj);
//                         }
//                         else if (key == 'codeReview') {
//                             taskStatus.codeReview.items.push(obj);
//                         }
//                         else if (key == 'testing') {
//                             taskStatus.testing.items.push(obj);
//                         }
//                         else if (key == 'done') {
//                             taskStatus.done.items.push(obj);
//                         }

//                     }
//                 }
//             });
//             setColumns({taskStatus});

//         } catch (error) {

//         }

//     }

//     useEffect(() => {
//         getAllJiraTasks();
//     }, [])







//     return (
//         <div>
//             <h1 style={{ textAlign: "center" }}>Jira Board <button style={{ textAlign: "center" }}><JiraTasks /></button>
//             </h1>

//             <div
//                 style={{ display: "flex", justifyContent: "center", height: "100%" }}
//             >
//                 <DragDropContext
//                     onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
//                 >
//                     {Object.entries(columns).map(([columnId, column], index) => {
//                         return (
//                             <div
//                                 style={{
//                                     display: "flex",
//                                     flexDirection: "column",
//                                     alignItems: "center"
//                                 }}
//                                 key={columnId}
//                             >
//                                 <h2>{column.name}</h2>
//                                 <div style={{ margin: 8 }}>
//                                     <Droppable droppableId={columnId} key={columnId}>
//                                         {(provided, snapshot) => {
//                                             return (
//                                                 <div
//                                                     {...provided.droppableProps}
//                                                     ref={provided.innerRef}
//                                                     style={{
//                                                         background: snapshot.isDraggingOver
//                                                             ? "lightblue"
//                                                             : "lightgrey",
//                                                         padding: 4,
//                                                         width: 250,
//                                                         minHeight: 500
//                                                     }}
//                                                 >
//                                                     {column.items.map((item, index) => {
//                                                         return (
//                                                             <Draggable
//                                                                 key={item.id}
//                                                                 draggableId={item.id}
//                                                                 index={index}
//                                                             >
//                                                                 {(provided, snapshot) => {
//                                                                     return (
//                                                                         <div
//                                                                             ref={provided.innerRef}
//                                                                             {...provided.draggableProps}
//                                                                             {...provided.dragHandleProps}
//                                                                             style={{
//                                                                                 userSelect: "none",
//                                                                                 padding: 16,
//                                                                                 margin: "0 0 8px 0",
//                                                                                 minHeight: "50px",
//                                                                                 backgroundColor: snapshot.isDragging
//                                                                                     ? "#263B4A"
//                                                                                     : "#456C86",
//                                                                                 color: "white",
//                                                                                 ...provided.draggableProps.style
//                                                                             }}
//                                                                         >
//                                                                             {item.content}
//                                                                         </div>
//                                                                     );
//                                                                 }}
//                                                             </Draggable>
//                                                         );
//                                                     })}
//                                                     {provided.placeholder}
//                                                 </div>
//                                             );
//                                         }}
//                                     </Droppable>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </DragDropContext>
//             </div>
//         </div>
//     );
// }

// export default JiraApp;




import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import JiraTasks from "./JiraTasks";
import { getAllJiraTaskAPI, updateJiraStatusAPI } from "@/services/jiraService";
import { toast } from 'react-toastify';

const tasks = [
    { id: "1", content: "First task" },
    { id: "2", content: "Second task" },
    { id: "3", content: "Third task" },
    { id: "4", content: "Fourth task" },
    { id: "5", content: "Fifth task" },
];

const taskStatus = {
    backlog: {
        name: "Backlog",
        items: [],
    },
    blocked: {
        name: "Blocked",
        items: [],
    },
    inProgress: {
        name: "In Progress",
        items: [],
    },
    codeReview: {
        name: "Code Review",
        items: [],
    },
    testing: {
        name: "Testing",
        items: [],
    },
    done: {
        name: "Done",
        items: [],
    },
};

const updateTaskStatusById = async (data) => {
    try {
        const result = await updateJiraStatusAPI(data);
        console.log(result);
        toast.success(`Task status updated to "${data.status}"`);
    } catch (error) {
        console.log(error);
        toast.success(`Failed to update task status`);
    }

}

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        });
        const obj = {
            jiraId: removed.id,
            status: destination.droppableId
        }
        updateTaskStatusById(obj);
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};

const JiraApp = () => {
    const [columns, setColumns] = useState(taskStatus);

    const getAllJiraTasks = async () => {
        try {
            const result = await getAllJiraTaskAPI();
            // result.forEach((element) => {
            //     for (const key in taskStatus) {
            //         if (element.status === key) {
            //             const obj = {
            //                 id: element._id,
            //                 content: element.summary,
            //             };


            //             if (key === "backlog") {
            //                 taskStatus.backlog.items.push(obj);
            //             } else if (key === "blocked") {
            //                 taskStatus.blocked.items.push(obj);
            //             } else if (key === "inProgress") {
            //                 taskStatus.inProgress.items.push(obj);
            //             } else if (key === "codeReview") {
            //                 taskStatus.codeReview.items.push(obj);
            //             } else if (key === "testing") {
            //                 taskStatus.testing.items.push(obj);
            //             } else if (key === "done") {
            //                 taskStatus.done.items.push(obj);
            //             }
            //         }
            //     }
            // });
            // setColumns(taskStatus);
            setColumns(result);

        } catch (error) { }
    };

    useEffect(() => {
        getAllJiraTasks();
    }, []);

    const isJiraCreated = () => {
        getAllJiraTasks();
    }

    return (
        <div className="min-h-screen bg-gray-200 flex flex-col">
            <header className="bg-blue-500 text-white text-2xl  text-center">
                Jira Board


                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded">
                    <JiraTasks isJiraCreated={isJiraCreated} />
                </button>
                <button onClick={getAllJiraTasks} className="bg-blue-500 hover:bg-blue-700 text-white font-bold   rounded">
                    Refresh
                </button>

            </header>
            <main className="flex-1 p-8">
                <div className="flex justify-center">
                    <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                        {Object.entries(columns).map(([columnId, column]) => {
                            return (
                                <div key={columnId} className="p-4 bg-white rounded-lg shadow-lg m-4">
                                    <h2 className="text-2xl mb-4">{column.name}</h2>




                                    <Droppable droppableId={columnId}>


                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                className={`${snapshot.isDraggingOver ? "bg-blue-100" : "bg-gray-300"
                                                    } p-4 min-h-80 rounded-lg`}
                                            >







                                                {column.items.map((item, index) =>
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className={`${snapshot.isDragging ? "bg-blue-500" : "bg-blue-700"
                                                                    } text-white p-4 mb-4 rounded-lg`}
                                                            >

                                                                <h3>{item.jiraNo}</h3>
                                                                <p> {item.content}</p>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                )}















                                                {provided.placeholder}
                                            </div>
                                        )}



                                    </Droppable>




                                </div>
                            );
                        })}
                    </DragDropContext>

                </div>
            </main>
        </div>
    );
};

export default JiraApp;
