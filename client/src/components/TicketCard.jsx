// src/components/TicketCard.jsx
import React from "react";

const getStatusBadge = (status) =>
  ({
    open: "bg-cyan-500",
    "in-progress": "bg-blue-500",
    resolved: "bg-emerald-500",
  }[status] || "bg-gray-500");

const getPriorityBadge = (priority) =>
  ({
    high: "bg-red-500",
    medium: "bg-orange-500",
    low: "bg-gray-500",
  }[priority] || "bg-gray-500");

const TicketCard = ({
  ticket,
  isDark,
  renderIcon,
  onClick,
  onStatusChange,
}) => {
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-300" : "text-gray-600";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";
  const borderClass = isDark ? "border-slate-700" : "border-gray-200";

  return (
    <div
      onClick={onClick}
      className={`border rounded-xl p-6 cursor-pointer group transition-all duration-300 ${
        isDark
          ? "bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/10"
          : "bg-white border-gray-200 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-lg ${
              isDark
                ? "bg-purple-500/20 text-purple-400"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {ticket.id}
          </span>
          <select
            value={ticket.status}
            onChange={(e) => onStatusChange(ticket.id, e.target.value)}
            className={`px-2 py-1 rounded-md text-white text-xs font-bold ${getStatusBadge(
              ticket.status
            )} appearance-none`}
          >
            <option value="open">OPEN</option>
            <option value="in-progress">IN PROGRESS</option>
            <option value="resolved">RESOLVED</option>
          </select>
        </div>
        <span
          className={`px-2 py-1 rounded-md text-white text-xs font-bold ${getPriorityBadge(
            ticket.priority
          )}`}
        >
          {ticket.priority.toUpperCase()}
        </span>
      </div>

      <div
        className={`text-xs font-semibold uppercase tracking-wider mb-2 ${textMuted}`}
      >
        {ticket.category}
      </div>
      <h3 className={`text-lg font-bold mb-3 ${textPrimary}`}>
        {ticket.title}
      </h3>
      <p className={`text-sm mb-4 line-clamp-2 ${textSecondary}`}>
        {ticket.description}
      </p>

      <div
        className={`pt-4 border-t flex items-center justify-between ${borderClass}`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            {ticket.assignee
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className={`text-xs font-medium ${textPrimary}`}>
              {ticket.assignee}
            </p>
            <p className={`text-xs ${textMuted}`}>{ticket.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {renderIcon("message", `w-4 h-4 ${textMuted}`)}
          <span className={`text-sm font-bold ${textSecondary}`}>
            {ticket.replies}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
