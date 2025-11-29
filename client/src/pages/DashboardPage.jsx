// src/pages/DashboardPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import StatCard from "../components/StatCard";
import FilterSelect from "../components/FilterSelect";
import TicketCard from "../components/TicketCard";
import CreateTicketModal from "../components/CreateTicketModal";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { theme } = useOutletContext();
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [tickets, setTickets] = useState([]);
  const [newTicketForm, setNewTicketForm] = useState({
    title: "",
    description: "",
    category: "TECHNICAL",
    priority: "medium",
  });
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const initialTickets = [
    {
      id: "TK-1035",
      category: "BUG REPORT",
      title: "Dashboard Data Not Loading",
      description: "Dashboard analytics widgets are showing empty state...",
      status: "resolved",
      priority: "high",
      time: "3 days ago",
      replies: 8,
      assignee: "Mahdi Chaabani",
    },
    {
      id: "TK-1033",
      category: "TECHNICAL",
      title: "API Rate Limit Issues",
      description: "Experiencing frequent rate limit errors...",
      status: "open",
      priority: "high",
      time: "4 days ago",
      replies: 2,
      assignee: "Sarah Johnson",
    },
    {
      id: "TK-1030",
      category: "FEATURE REQUEST",
      title: "Export Data Feature",
      description: "Add ability to export user data...",
      status: "in-progress",
      priority: "medium",
      time: "5 days ago",
      replies: 7,
      assignee: "Alex Chen",
    },
  ];

  useEffect(() => {
    setTickets(initialTickets);
  }, []);

  const isDark = theme === "dark";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";

  const stats = [
    {
      title: "TOTAL TICKETS",
      value: tickets.length,
      color: "from-indigo-500 to-purple-600",
      icon: "clipboard",
    },
    {
      title: "OPEN TICKETS",
      value: tickets.filter((t) => t.status === "open").length,
      color: "from-purple-600 to-blue-600",
      icon: "clock",
    },
    {
      title: "IN PROGRESS",
      value: tickets.filter((t) => t.status === "in-progress").length,
      color: "from-blue-600 to-purple-600",
      icon: "zap",
    },
    {
      title: "RESOLVED",
      value: tickets.filter((t) => t.status === "resolved").length,
      color: "from-purple-500 to-blue-500",
      icon: "check",
    },
  ];

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || ticket.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicketForm.title.trim() || !newTicketForm.description.trim())
      return;
    const newTicket = {
      id: `TK-${1045 + tickets.length}`,
      ...newTicketForm,
      status: "open",
      time: "Just now",
      replies: 0,
      assignee: "Mahdi Chaabani",
    };
    setTickets([newTicket, ...tickets]);
    setNewTicketForm({
      title: "",
      description: "",
      category: "TECHNICAL",
      priority: "medium",
    });
    setShowCreateTicket(false);
  };

  const updateTicketStatus = useCallback((id, newStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  }, []);

  // NEW: Export stats as CSV
  const exportStats = () => {
    const headers = ["Metric", "Value"];
    const rows = stats.map((s) => [s.title, s.value]);
    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "sts-dashboard-stats.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderIcon = (name, className = "w-6 h-6") => {
    const paths = {
      clipboard: (
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      ),
      clock: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      zap: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
      check: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
      plus: <path d="M12 4v16m8-8H4" />,
      message: (
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      ),
      download: (
        <path d="M12 10v6m0 0l-5-5m5 5l5-5m-8-4h10a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V12a2 2 0 012-2z" />
      ),
    };
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        {paths[name]}
      </svg>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>
            Dashboard
          </h1>
          <p className={`text-sm ${textSecondary}`}>Welcome back, Mahdi 👋</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={exportStats}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold border ${
              isDark
                ? "border-slate-700 text-slate-300 hover:bg-slate-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            }`}
          >
            {renderIcon("download", "w-5 h-5")}
            Export Stats
          </button>
          <button
            onClick={() => setShowCreateTicket(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
          >
            {renderIcon("plus", "w-5 h-5")}
            Create Ticket
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <StatCard
            key={i}
            stat={stat}
            isDark={isDark}
            renderIcon={renderIcon}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <FilterSelect
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "all", label: "All Status" },
            { value: "open", label: "Open" },
            { value: "in-progress", label: "In Progress" },
            { value: "resolved", label: "Resolved" },
          ]}
          isDark={isDark}
        />
        <FilterSelect
          label="Priority"
          value={priorityFilter}
          onChange={setPriorityFilter}
          options={[
            { value: "all", label: "All Priority" },
            { value: "high", label: "High" },
            { value: "medium", label: "Medium" },
            { value: "low", label: "Low" },
          ]}
          isDark={isDark}
        />
      </div>

      {/* Ticket Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            isDark={isDark}
            renderIcon={renderIcon}
            onClick={() => navigate("/tickets")}
            onStatusChange={updateTicketStatus}
          />
        ))}
      </div>

      {/* Modal */}
      {showCreateTicket && (
        <CreateTicketModal
          newTicketForm={newTicketForm}
          setNewTicketForm={setNewTicketForm}
          isDark={isDark}
          handleCreateTicket={handleCreateTicket}
          setShowCreateTicket={setShowCreateTicket}
        />
      )}
    </div>
  );
};

export default DashboardPage;
