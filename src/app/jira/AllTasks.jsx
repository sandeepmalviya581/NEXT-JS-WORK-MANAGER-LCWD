import TaskCard from './TaskCard'; // Import your TaskCard component

function AllTasks({ tasks }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default AllTasks;
