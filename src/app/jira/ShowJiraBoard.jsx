"use client"
import { useState } from 'react';
import Tabs from './Tabs';
// import MyTasks from './MyTasks'; // Implement MyTasks, TeamTasks, and AllTasks
// import TeamTasks from './TeamTasks';
import AllTasks from './AllTasks';

function TaskBoard() {

    const mockTasks = [
        {
          id: 1,
          summary: "Create a mockup for the new feature",
          assignee: "John Doe",
          status: "To Do",
        },
        {
          id: 2,
          summary: "Implement the authentication system",
          assignee: "Jane Smith",
          status: "In Progress",
        },
        {
          id: 3,
          summary: "Fix bug #123",
          assignee: "David Johnson",
          status: "In Progress",
        },
        {
          id: 4,
          summary: "Write documentation",
          assignee: "Alice Brown",
          status: "Done",
        },
      ];

  const tabs = ["My Tasks", "Team Tasks", "All Tasks"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div>
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* {activeTab === "My Tasks" && <MyTasks />} */}
      {/* {activeTab === "Team Tasks" && <TeamTasks />} */}
      {activeTab === "All Tasks" && <AllTasks tasks={mockTasks} />}
    </div>
  );
}

export default TaskBoard;
