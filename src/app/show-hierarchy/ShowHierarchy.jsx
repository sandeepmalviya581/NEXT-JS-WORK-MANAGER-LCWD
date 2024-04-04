// components/ShowHierarchy.js
"use client"
// import { useState } from 'react';

// const ShowHierarchy = ({ data }) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   const handleAddItem = () => {
//     // Add your logic here to add a new item to the hierarchy
//     console.log("Add item button clicked");
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center mb-8 text-blue-500">Hierarchy</h1>
//       <ul className="ml-4">
//         {data.map((item) => (
//           <li key={item._id} className="border-l-4 border-gray-300 pl-4 py-2 mb-2">
//             <div onClick={toggleExpand} className="flex items-center cursor-pointer">
//               <strong className="text-blue-500">_id:</strong> {item._id}
//             </div>
//             {expanded && (
//               <div className="ml-4">
//                 <div>
//                   <strong className="text-blue-500">levelNumber:</strong> {item.levelNumber}
//                 </div>
//                 <div>
//                   <strong className="text-blue-500">createdDate:</strong> {item.createdDate}
//                 </div>
//                 <div>
//                   <strong className="text-blue-500">createdBy:</strong> {item.createdBy}
//                 </div>
//                 <div>
//                   <strong className="text-blue-500">unique_id:</strong> {item.unique_id}
//                 </div>
//                 <div>
//                   <strong className="text-blue-500">parent_id:</strong> {item.parent_id}
//                 </div>
//                 <button onClick={handleAddItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Add Hierarchy Item</button>
//                 {item.hierarchyList && (
//                   <div>
//                     <strong className="text-blue-500">hierarchyList:</strong>{" "}
//                     <ShowHierarchy data={item.hierarchyList} />
//                   </div>
//                 )}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };



import { useState } from 'react';

const ShowHierarchy = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAddItem = () => {
    // Add your logic here to add a new item to the hierarchy
    console.log("Add item button clicked");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ul className="ml-4">
        {data.map((item) => (
          <li key={item._id} className="border-l-4 border-gray-300 pl-4 py-2 mb-2">
            <div onClick={toggleExpand} className="flex items-center cursor-pointer">
              <strong className="text-blue-500">_id:</strong> {item._id}
            </div>
            {expanded && (
              <div className="ml-4">
                <div>
                  <strong className="text-blue-500">levelNumber:</strong> {item.levelNumber}
                </div>
                <div>
                  <strong className="text-blue-500">createdDate:</strong> {item.createdDate}
                </div>
                <div>
                  <strong className="text-blue-500">createdBy:</strong> {item.createdBy}
                </div>
                <div>
                  <strong className="text-blue-500">unique_id:</strong> {item.unique_id}
                </div>
                <div>
                  <strong className="text-blue-500">parent_id:</strong> {item.parent_id}
                </div>
                <button onClick={handleAddItem} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">Add Hierarchy Item</button>
                {item.hierarchyList && (
                  <div>
                    <strong className="text-blue-500">hierarchyList:</strong>{" "}
                    <ShowHierarchy data={item.hierarchyList} />
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};







const ShowHierarchyHome = () => {
  const data = [
    {
      "_id": "65fd496e38531aa3d4258be7",
      "levelNumber": 1,
      "createdDate": "2024-03-22T08:59:21.590Z",
      "createdBy": "sandee",
      "unique_id": "1232656",
      "parent_id": "",
      "hierarchyList": [
        {
          "levelNumber": 2,
          "createdDate": "2024-03-22T08:59:21.590Z",
          "createdBy": "sandee",
          "unique_id": "4gf54gf5h4gh4",
          "parent_id": "1232656",
          "_id": "65fd496e38531aa3d4258be8",
          "hierarchyList": []
        },
        {
            "levelNumber": 2,
            "createdDate": "2024-03-22T08:59:21.590Z",
            "createdBy": "sandee",
            "unique_id": "4gf54gf5h4gh4",
            "parent_id": "1232656",
            "_id": "65fd496e38531aa3d4258be8",
            "hierarchyList": []
          },
          {
              "levelNumber": 2,
              "createdDate": "2024-03-22T08:59:21.590Z",
              "createdBy": "sandee",
              "unique_id": "4gf54gf5h4gh4",
              "parent_id": "1232656",
              "_id": "65fd496e38531aa3d4258be8",
              "hierarchyList": []
            }
      ]
    }
  ];

  return <ShowHierarchy data={data} />;
};

export default ShowHierarchyHome;
