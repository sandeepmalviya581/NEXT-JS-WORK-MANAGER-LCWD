function TaskCard({ task }) {
    return (
      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold">{task.summary}</h3>
        <p className="text-sm text-gray-600">Assignee: {task.assignee}</p>
        <p className="text-sm text-gray-600">Status: {task.status}</p>
        {/* Add more task details here */}
      </div>
    );
  }
  
  export default TaskCard;
  