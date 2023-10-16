"use client"
import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskColumn from './TaskColumn';



function TaskBoard() {

  const taskData1 = {
    toDo: [
      { id: 'task-1', content: 'Todo 1' },
      { id: 'task-2', content: 'Todo 2' },
    ],
    inProgress: [
      { id: 'task-3', content: 'inProgress 1' },
      { id: 'task-5', content: 'inProgress 2' },

    ],
    done: [
      { id: 'task-4', content: 'done 1' },
      { id: 'task-6', content: 'done 2' },

    ],
  };

   const [taskData, setTaskData] = useState(taskData1);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If the task was not dropped in a valid destination
    if (!destination) {
      return;
    }

    // If the task was dropped in the same column and in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Reorder the tasks based on the drag-and-drop
    const startColumn = taskData[source.droppableId];
    const endColumn = taskData[destination.droppableId];
    const [movedTask] = startColumn.splice(source.index, 1);
    endColumn.splice(destination.index, 0, movedTask);

    // Update the state or send the new order to your backend (e.g., Jira API)
    // This is where you would handle the actual task reordering logic

    // For example, you can update the state (assuming you use React state):
    setTaskData({ ...taskData });
  };

  // const onDragEnd = (result) => {
  //   const { source, destination } = result;
  
  //   // Perform your task reordering logic unconditionally
  //   if (source.index !== destination.index || source.droppableId !== destination.droppableId) {
  //     // The item was dropped in a different position or a different column
  //     // Reorder the tasks based on the drag-and-drop
  //     const startColumn = taskData[source.droppableId];
  //     const endColumn = taskData[destination.droppableId];
  //     const [movedTask] = startColumn.splice(source.index, 1);
  //     endColumn.splice(destination.index, 0, movedTask);
  
  //     // Update the state or send the new order to your backend (e.g., Jira API)
  //     // This is where you would handle the actual task reordering logic
  
  //     // For example, you can update the state (assuming you use React state):
  //     setTaskData({ ...taskData });
  //   }
  // };
  


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        <TaskColumn title="To Do" tasks={taskData.toDo} droppableId="toDo" />
        <TaskColumn title="In Progress" tasks={taskData.inProgress} droppableId="inProgress" />
        <TaskColumn title="Done" tasks={taskData.done} droppableId="done" />
      </div>
    </DragDropContext>
  );
}

export default TaskBoard;
