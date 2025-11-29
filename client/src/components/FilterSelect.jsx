// src/components/FilterSelect.jsx
import React from "react";

const FilterSelect = ({ label, value, onChange, options, isDark }) => {
  return (
    <div className="flex items-center gap-2">
      <label
        className={`text-sm font-medium whitespace-nowrap ${
          isDark ? "text-gray-400" : "text-gray-700"
        }`}
      >
        {label}:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`px-4 py-2 rounded-lg border font-medium text-sm focus:outline-none focus:ring-2 transition-colors ${
          isDark
            ? "bg-slate-800 border-slate-700 text-white focus:ring-purple-500/20 focus:border-purple-500"
            : "bg-white border-gray-300 text-gray-900 focus:ring-purple-500/20 focus:border-purple-500"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSelect;
