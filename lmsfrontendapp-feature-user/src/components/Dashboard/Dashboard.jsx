import React from "react";


    const Dashboard = () => {
        const metrics = [
          {
            title: "Average time spent",
            value: "08m 01s",
            trend: "-53%",
            icon: "⏳",
            changeColor: "text-red-500",
          },
          {
            title: "Total views",
            value: "114",
            trend: "100%",
            icon: "👁️",
            changeColor: "text-green-500",
          },
          {
            title: "Average rating",
            value: "0",
            trend: "0%",
            icon: "⭐",
            changeColor: "text-gray-500",
          },
          {
            title: "Average attendance",
            value: "0%",
            trend: "0%",
            icon: "📊",
            changeColor: "text-gray-500",
          },
        ];
      
  return (
    <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow">
      <div>
        <h1 className="text-2xl font-bold">👋 Welcome </h1>
        <p className="text-gray-600">Let's begin your journey to training excellence.</p>
      </div>
      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow">
        📅 Schedule session
      </button>
    </div>
  );
};

export default Dashboard;
