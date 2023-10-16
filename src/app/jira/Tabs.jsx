function Tabs({ tabs, activeTab, setActiveTab }) {
    return (
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
            } p-2 rounded-md`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  }
  
  export default Tabs;
  