import React, { useState } from 'react';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="">
      <div className='flex sticky top-[4.5rem] ml-3 z-20 bg-gray-50 rounded-xl border-b border-gray-300 '>
      <div className="flex mx-14">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`font-bold text-base py-2 px-6 ${activeTab === index ? ' font-bold border-b-2 border-black' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      </div>
      <hr className='border-t border-gray-300 p-1 '/>
      <div className="p-1">
        {tabs[activeTab].content}
      </div>
    </div>

  );
};

export default Tabs;