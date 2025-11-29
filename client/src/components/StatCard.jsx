// src/components/StatCard.jsx
import React from "react";

const StatCard = ({ stat, isDark, renderIcon }) => {
  const bgColor = isDark
    ? "bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/10"
    : "bg-white border-gray-200 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200";

  return (
    <div
      className={`border rounded-xl p-6 cursor-pointer group transition-all duration-300 ${bgColor}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-md`}
        >
          {renderIcon(stat.icon, "w-6 h-6 text-white")}
        </div>
        <div>
          <h3
            className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {stat.title}
          </h3>
          <span
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {stat.value}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
