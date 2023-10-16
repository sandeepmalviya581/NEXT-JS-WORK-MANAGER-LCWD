import { Draggable } from 'react-beautiful-dnd';

function TaskCard1({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white p-4 mb-4 rounded-md shadow-md"
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard1;
