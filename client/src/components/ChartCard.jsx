// src/components/ChartCard.jsx
import React from "react";

const ChartCard = ({ title, children, isDark }) => {
  const surface = isDark
    ? "bg-slate-800/80 border-slate-700"
    : "bg-white border-gray-200";
  const textPrimary = isDark ? "text-white" : "text-gray-900";

  return (
    <div className={`rounded-xl border p-5 ${surface}`}>
      <h3 className={`font-semibold mb-4 ${textPrimary}`}>{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;
