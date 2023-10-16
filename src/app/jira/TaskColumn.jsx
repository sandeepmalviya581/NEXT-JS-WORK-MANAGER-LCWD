import { Droppable } from 'react-beautiful-dnd';
import TaskCard1 from './TaskCard1';

function TaskColumn({ title, tasks , droppableId }) {
  return (
    <div className="w-1/3 border p-4 rounded-md">
      <h2 className="text-lg font-bold">{title}</h2>
      <Droppable droppableId={droppableId} direction="vertical">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <TaskCard1 key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskColumn;



// function TaskColumn({ title, tasks, droppableId }) {
//   return (
//     <div className="w-1/3 border p-4 rounded-md">
//       <h2 className="text-lg font-bold">{title}</h2>
//       <Droppable droppableId={droppableId} direction="vertical">
//         {(provided) => (
//           <div ref={provided.innerRef} {...provided.droppableProps}>
//             {tasks.map((task, index) => (
//               <TaskCard key={task.id} task={task} index={index} />
//             )}
//           </div>
//         )}
//       </Droppable>
//     </div>
//   );
// }


