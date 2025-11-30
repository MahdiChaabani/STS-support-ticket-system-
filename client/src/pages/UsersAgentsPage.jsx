// src/pages/UsersAgentsPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";

// ——— Modal Components ———

const CreateUserModal = ({ onClose, onCreate }) => {
  const { theme } = useOutletContext();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-800" : "bg-white";
  const borderClass = isDark ? "border-slate-700" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    onCreate({
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone || "",
      department: data.department || "Technical Support",
      status: "active",
      joinedAt: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-md rounded-xl p-6 ${bgClass} border ${borderClass} shadow-xl`}
      >
        <h3 className={`text-xl font-bold mb-5 ${textPrimary}`}>
          Add New User
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Full Name
            </label>
            <input
              name="name"
              required
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 bg-transparent ${textPrimary} outline-none`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 bg-transparent ${textPrimary} outline-none`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Role
            </label>
            <select
              name="role"
              required
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 bg-transparent ${textPrimary} outline-none`}
            >
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                Phone
              </label>
              <input
                name="phone"
                className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 bg-transparent ${textPrimary} outline-none`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                Department
              </label>
              <input
                name="department"
                defaultValue="Technical Support"
                className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 bg-transparent ${textPrimary} outline-none`}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
            >
              Create
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-lg border ${borderClass} ${textPrimary}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const { theme } = useOutletContext();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-800" : "bg-white";
  const borderClass = isDark ? "border-slate-700" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    onUpdate(user.id, {
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      department: data.department,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-md rounded-xl p-6 ${bgClass} border ${borderClass} shadow-xl`}
      >
        <h3 className={`text-xl font-bold mb-5 ${textPrimary}`}>
          Edit {user.name}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Full Name
            </label>
            <input
              name="name"
              defaultValue={user.name}
              required
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 bg-transparent ${textPrimary} outline-none`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              defaultValue={user.email}
              required
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 bg-transparent ${textPrimary} outline-none`}
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Role
            </label>
            <select
              name="role"
              defaultValue={user.role}
              required
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 bg-transparent ${textPrimary} outline-none`}
            >
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                Phone
              </label>
              <input
                name="phone"
                defaultValue={user.phone || ""}
                className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 bg-transparent ${textPrimary} outline-none`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${textSecondary}`}
              >
                Department
              </label>
              <input
                name="department"
                defaultValue={user.department}
                className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 bg-transparent ${textPrimary} outline-none`}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 font-medium rounded-lg"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-lg border ${borderClass} ${textPrimary}`}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ViewUserModal = ({ user, onClose }) => {
  const { theme } = useOutletContext();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-800" : "bg-white";
  const borderClass = isDark ? "border-slate-700" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-lg rounded-xl p-6 ${bgClass} border ${borderClass} shadow-xl`}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className={`text-xl font-bold ${textPrimary}`}>User Details</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h4 className={`text-lg font-semibold ${textPrimary}`}>
                {user.name}
              </h4>
              <p className={`text-sm ${textSecondary}`}>{user.email}</p>
              <p className={`text-sm ${textSecondary}`}>{user.phone}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p
                className={`text-xs font-medium uppercase tracking-wider ${textSecondary}`}
              >
                Role
              </p>
              <p className={`mt-1 ${textPrimary}`}>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </p>
            </div>
            <div>
              <p
                className={`text-xs font-medium uppercase tracking-wider ${textSecondary}`}
              >
                Status
              </p>
              <p className={`mt-1 ${textPrimary}`}>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                  }`}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </p>
            </div>
            <div>
              <p
                className={`text-xs font-medium uppercase tracking-wider ${textSecondary}`}
              >
                Department
              </p>
              <p className={`mt-1 ${textPrimary}`}>{user.department}</p>
            </div>
            <div>
              <p
                className={`text-xs font-medium uppercase tracking-wider ${textSecondary}`}
              >
                Joined
              </p>
              <p className={`mt-1 ${textPrimary}`}>
                {new Date(user.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {user.role === "agent" && (
            <div className="pt-4 border-t border-inherit">
              <p
                className={`text-xs font-medium uppercase tracking-wider ${textSecondary} mb-2`}
              >
                Performance
              </p>
              <div className="flex gap-6">
                <div>
                  <p className={`text-sm ${textSecondary}`}>Tickets Handled</p>
                  <p className={`font-medium ${textPrimary}`}>
                    {user.ticketsHandled}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${textSecondary}`}>Rating</p>
                  <p className={`font-medium ${textPrimary}`}>
                    ★ {user.rating}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-lg ${textPrimary} border ${borderClass}`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const DeleteUserModal = ({ user, onClose, onConfirm }) => {
  const { theme } = useOutletContext();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-800" : "bg-white";
  const borderClass = isDark ? "border-slate-700" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";

  const handleDelete = () => {
    onConfirm(user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-md rounded-xl p-6 ${bgClass} border ${borderClass} shadow-xl`}
      >
        <div className="flex justify-between items-center mb-5">
          <h3 className={`text-xl font-bold ${textPrimary}`}>Delete User</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <p className={`text-sm ${textSecondary}`}>
            Are you sure you want to delete <strong>{user.name}</strong>? This
            action cannot be undone.
          </p>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleDelete}
              className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-lg border ${borderClass} ${textPrimary}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ——— MAIN PAGE ———
const UsersAgentsPage = () => {
  // ✅ Get theme from MainLayout
  const { theme } = useOutletContext();
  const isDark = theme === "dark";

  // Theme classes
  const bgClass = isDark ? "bg-slate-900" : "bg-white";
  const borderClass = isDark ? "border-slate-800" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";
  const textMuted = isDark ? "text-slate-500" : "text-slate-400";
  const cardBg = isDark ? "bg-slate-800" : "bg-white";
  const tableHeaderBg = isDark ? "bg-slate-800/50" : "bg-slate-50";
  const tableRowHover = isDark ? "hover:bg-slate-800" : "hover:bg-slate-50";
  const inputBg = isDark
    ? "bg-slate-800 border-slate-700"
    : "bg-white border-slate-300";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // ✅ Fixed: use "user", not "data"
  const [modal, setModal] = useState({ open: false, type: null, user: null });

  // Mock data
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "Maria Chen",
        email: "maria.chen@sts.com",
        role: "agent",
        status: "active",
        lastLogin: "2025-11-29T15:30:00Z",
        ticketsHandled: 127,
        rating: 4.8,
        phone: "+216 20 123 456",
        department: "Technical Support",
        joinedAt: "2024-03-15",
      },
      {
        id: 2,
        name: "David Miller",
        email: "david.miller@sts.com",
        role: "agent",
        status: "active",
        lastLogin: "2025-11-30T10:15:00Z",
        ticketsHandled: 98,
        rating: 4.6,
        phone: "+216 20 234 567",
        department: "Billing",
        joinedAt: "2024-05-22",
      },
      {
        id: 3,
        name: "Sophia Garcia",
        email: "sophia.garcia@sts.com",
        role: "admin",
        status: "active",
        lastLogin: "2025-11-30T09:45:00Z",
        ticketsHandled: 0,
        rating: 0,
        phone: "+216 20 345 678",
        department: "Management",
        joinedAt: "2023-11-01",
      },
      {
        id: 4,
        name: "James Wilson",
        email: "james.wilson@sts.com",
        role: "agent",
        status: "inactive",
        lastLogin: "2025-11-25T17:20:00Z",
        ticketsHandled: 56,
        rating: 4.2,
        phone: "+216 20 456 789",
        department: "Technical Support",
        joinedAt: "2024-08-10",
      },
      {
        id: 5,
        name: "Lina Bouaziz",
        email: "lina.b@sts.com",
        role: "admin",
        status: "active",
        lastLogin: "2025-11-28T14:00:00Z",
        ticketsHandled: 0,
        rating: 0,
        phone: "+216 20 567 890",
        department: "Management",
        joinedAt: "2024-01-10",
      },
    ];

    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const filteredUsers = useCallback(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || user.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  const currentUsersList = filteredUsers();
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = currentUsersList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(currentUsersList.length / usersPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ CRUD functions — all working
  const createUser = (data) => {
    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      ...data,
      lastLogin: null,
      ticketsHandled: data.role === "agent" ? 0 : null,
      rating: data.role === "agent" ? 0 : null,
    };
    setUsers([...users, newUser]);
    setModal({ open: false, type: null, user: null });
  };

  const updateUser = (id, data) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, ...data } : u)));
    setModal({ open: false, type: null, user: null });
  };

  // ✅ Added missing deleteUser
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  // Stats calculations
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const admins = users.filter((u) => u.role === "admin").length;
  const agents = users.filter((u) => u.role === "agent").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Users / Agents</h1>
        <button
          onClick={() => setModal({ open: true, type: "create", user: null })}
          className="px-5 py-2.5 text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30 font-medium rounded-lg transition-colors shadow-sm"
        >
          + Add New User
        </button>
      </div>

      {/* Stats Cards + Search Bar */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4`}>
        <div className={`rounded-xl p-4 border ${borderClass} ${cardBg}`}>
          <p
            className={`text-xs font-medium uppercase tracking-wider ${textSecondary}`}
          >
            Total Users
          </p>
          <p className={`text-2xl font-bold ${textPrimary}`}>{totalUsers}</p>
        </div>
        <div className={`rounded-xl p-4 border ${borderClass} ${cardBg}`}>
          <p
            className={`text-xs font-medium uppercase tracking-wider ${textSecondary}`}
          >
            Active
          </p>
          <p className={`text-2xl font-bold ${textPrimary}`}>{activeUsers}</p>
        </div>
        <div className={`rounded-xl p-4 border ${borderClass} ${cardBg}`}>
          <p
            className={`text-xs font-medium uppercase tracking-wider ${textSecondary}`}
          >
            Admins
          </p>
          <p className={`text-2xl font-bold ${textPrimary}`}>{admins}</p>
        </div>
        <div className={`rounded-xl p-4 border ${borderClass} ${cardBg}`}>
          <p
            className={`text-xs font-medium uppercase tracking-wider ${textSecondary}`}
          >
            Agents
          </p>
          <p className={`text-2xl font-bold ${textPrimary}`}>{agents}</p>
        </div>
      </div>

      {/* Filters */}
      <div
        className={`rounded-xl p-5 shadow-sm ${bgClass} ${borderClass} border`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Search
            </label>
            <div className={`relative`}>
              <svg
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${textMuted}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isDark ? "bg-slate-800 text-white" : "bg-white text-slate-900"
                }`}
              />
            </div>
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-1 ${textSecondary}`}
            >
              Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border ${borderClass} focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDark ? "bg-slate-800 text-white" : "bg-white text-slate-900"
              }`}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterRole("all");
                setCurrentPage(1);
              }}
              className={`w-full px-4 py-2 rounded-lg font-medium border ${borderClass} ${
                isDark
                  ? "bg-slate-800 hover:bg-slate-700 text-slate-200"
                  : "bg-gray-100 hover:bg-gray-200 text-slate-700"
              }`}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className={`rounded-xl overflow-hidden shadow-sm ${bgClass} ${borderClass} border`}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
            <thead className={tableHeaderBg}>
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Last Login
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Tickets
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {currentUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className={`px-6 py-12 text-center ${textSecondary}`}
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                currentUsers.map((user) => (
                  <tr key={user.id} className={tableRowHover}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${textPrimary}`}>
                            {user.name}
                          </div>
                          <div className={`text-sm ${textMuted}`}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300"
                            : "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                        }`}
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-300">
                      {user.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-300">
                      {user.lastLogin ? formatDate(user.lastLogin) : "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-300">
                      {user.ticketsHandled}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        {/* View Icon */}
                        <button
                          onClick={() =>
                            setModal({ open: true, type: "view", user })
                          }
                          title="View User Details"
                          className={`p-1.5 rounded-full ${
                            isDark
                              ? "text-blue-400 hover:bg-blue-900/30"
                              : "text-blue-600 hover:bg-blue-100"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </button>

                        {/* Edit Icon */}
                        <button
                          onClick={() =>
                            setModal({ open: true, type: "edit", user })
                          }
                          title="Edit User"
                          className={`p-1.5 rounded-full ${
                            isDark
                              ? "text-green-400 hover:bg-green-900/30"
                              : "text-green-600 hover:bg-green-100"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-5L20 14.586a2 2 0 002.828 0l2.828-2.828a2 2 0 000-2.828L20 6.172a2 2 0 00-2.828 0z"
                            />
                          </svg>
                        </button>

                        {/* Activate/Deactivate Icon */}
                        <button
                          onClick={() => toggleUserStatus(user.id)}
                          title={
                            user.status === "active"
                              ? "Deactivate User"
                              : "Activate User"
                          }
                          className={`p-1.5 rounded-full ${
                            user.status === "active"
                              ? isDark
                                ? "text-red-400 hover:bg-red-900/30"
                                : "text-red-600 hover:bg-red-100"
                              : isDark
                              ? "text-green-400 hover:bg-green-900/30"
                              : "text-green-600 hover:bg-green-100"
                          }`}
                        >
                          {user.status === "active" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M18.364 18.364L12 12m6.364-6.364L12 12M12 12L5.636 5.636M12 12l6.364-6.364"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>

                        {/* Delete Icon */}
                        <button
                          onClick={() =>
                            setModal({ open: true, type: "delete", user })
                          }
                          title="Delete User"
                          className={`p-1.5 rounded-full ${
                            isDark
                              ? "text-red-400 hover:bg-red-900/30"
                              : "text-red-600 hover:bg-red-100"
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A1 1 0 0117.133 21H6.867A1 1 0 016 19.858L5.133 7M21 7H3M12 9v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className={`px-6 py-4 border-t ${borderClass} flex flex-col sm:flex-row justify-between items-center gap-4`}
          >
            <div className={`text-sm ${textSecondary}`}>
              Showing {indexOfFirst + 1}–
              {Math.min(indexOfLast, currentUsersList.length)} of{" "}
              {currentUsersList.length} users
            </div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 rounded text-sm font-medium ${
                  currentPage === 1
                    ? "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1.5 rounded text-sm font-medium ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1.5 rounded text-sm font-medium ${
                  currentPage === totalPages
                    ? "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Modals — now correctly using `modal.user` and `onConfirm` */}
      {modal.open && modal.type === "create" && (
        <CreateUserModal
          onClose={() => setModal({ open: false, type: null, user: null })}
          onCreate={createUser}
        />
      )}
      {modal.open && modal.type === "edit" && modal.user && (
        <EditUserModal
          user={modal.user}
          onClose={() => setModal({ open: false, type: null, user: null })}
          onUpdate={updateUser}
        />
      )}
      {modal.open && modal.type === "view" && modal.user && (
        <ViewUserModal
          user={modal.user}
          onClose={() => setModal({ open: false, type: null, user: null })}
        />
      )}
      {modal.open && modal.type === "delete" && modal.user && (
        <DeleteUserModal
          user={modal.user}
          onClose={() => setModal({ open: false, type: null, user: null })}
          onConfirm={deleteUser}
        />
      )}
    </div>
  );
};

export default UsersAgentsPage;
