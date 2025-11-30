// src/pages/UsersAgentsPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";

// Modal Components (kept minimal — implement separately for full logic)
const CreateUserModal = ({ onClose, onCreate }) => {
  const { theme } = useOutletContext();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-900" : "bg-white";
  const borderClass = isDark ? "border-slate-800" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onCreate({
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      phone: formData.get("phone"),
      department: formData.get("department"),
      status: "active",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-md rounded-2xl p-6 ${bgClass} ${borderClass} border shadow-2xl`}
      >
        <h3 className={`text-xl font-bold mb-4 ${textPrimary}`}>
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
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-purple-500 bg-transparent ${textPrimary} outline-none`}
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
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-purple-500 bg-transparent ${textPrimary} outline-none`}
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
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-purple-500 bg-transparent ${textPrimary} outline-none ${
              isDark
                ? "bg-slate-800 border-slate-700 text-slate-300"
                : "bg-slate-100 border-slate-300 text-slate-600"
            }`}
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
                className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-purple-500 bg-transparent ${textPrimary} outline-none`}
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
                className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-purple-500 bg-transparent ${textPrimary} outline-none`}
                defaultValue="Technical Support"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg"
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

const ViewUserModal = ({ user, onClose }) => {
  const { theme } = useOutletContext();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-900" : "bg-white";
  const borderClass = isDark ? "border-slate-800" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-lg rounded-2xl p-6 ${bgClass} ${borderClass} border shadow-2xl`}
      >
        <div className="flex justify-between items-start mb-5">
          <h3 className={`text-xl font-bold ${textPrimary}`}>User Details</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h4 className={`text-xl font-semibold ${textPrimary}`}>
                {user.name}
              </h4>
              <p className={`text-sm ${textSecondary}`}>{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`text-sm ${textSecondary}`}>Role</p>
              <p className={`font-medium ${textPrimary}`}>
                <span
                  className={`inline-block px-2.5 py-0.5 text-xs rounded-full ${
                    user.role === "admin"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </p>
            </div>
            <div>
              <p className={`text-sm ${textSecondary}`}>Status</p>
              <p className={`font-medium ${textPrimary}`}>
                <span
                  className={`inline-block px-2.5 py-0.5 text-xs rounded-full ${
                    user.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </p>
            </div>
            <div>
              <p className={`text-sm ${textSecondary}`}>Department</p>
              <p className={`font-medium ${textPrimary}`}>{user.department}</p>
            </div>
            <div>
              <p className={`text-sm ${textSecondary}`}>Phone</p>
              <p className={`font-medium ${textPrimary}`}>
                {user.phone || "—"},
              </p>
            </div>
          </div>

          {user.role === "agent" && (
            <div className="pt-2 border-t border-inherit">
              <p className={`text-sm ${textSecondary} mb-1`}>Performance</p>
              <div className="flex items-center gap-4">
                <span className={`${textPrimary}`}>
                  Tickets: {user.ticketsHandled}
                </span>
                <span className={`${textPrimary}`}>
                  Rating: ★ {user.rating}
                </span>
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

const EditUserModal = ({ user, onClose, onUpdate }) => {
  const { theme } = useOutletContext();
  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-900" : "bg-white";
  const borderClass = isDark ? "border-slate-800" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    onUpdate(user.id, {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      phone: formData.get("phone"),
      department: formData.get("department"),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div
        className={`w-full max-w-md rounded-2xl p-6 ${bgClass} ${borderClass} border shadow-2xl`}
      >
        <h3 className={`text-xl font-bold mb-4 ${textPrimary}`}>
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
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-purple-500 bg-transparent ${textPrimary} outline-none`}
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
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-purple-500 bg-transparent ${textPrimary} outline-none`}
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
              className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-purple-500 bg-transparent ${textPrimary} outline-none`}
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
                className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-purple-500 bg-transparent ${textPrimary} outline-none`}
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
                className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} focus:ring-2 focus:ring-purple-500 bg-transparent ${textPrimary} outline-none`}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg"
            >
              Save Changes
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

// ✅ Main Component
const UsersAgentsPage = () => {
  // ⚠️ Use outlet context for theme — no internal ThemeContext
  const { theme } = useOutletContext();
  const isDark = theme === "dark";

  // Theme classes (aligned with your MainLayout & UsersPage)
  const bgClass = isDark ? "bg-slate-900" : "bg-white";
  const borderClass = isDark ? "border-slate-800" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";
  const textMuted = isDark ? "text-slate-500" : "text-slate-400";
  const cardBg = isDark ? "bg-slate-800" : "bg-white";
  const hoverCard = isDark ? "hover:bg-slate-750" : "hover:bg-slate-50";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [modal, setModal] = useState({ open: false, type: null, data: null });

  // Mock data (same as before)
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
    ];

    // Simulate API delay
    const timer = setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  const filteredUsers = useCallback(
    () =>
      users.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === "all" || user.role === filterRole;
        return matchesSearch && matchesRole;
      }),
    [users, searchTerm, filterRole]
  );

  const getRoleBadgeClass = (role) => {
    return role === "admin"
      ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
      : role === "agent"
      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
      : "bg-slate-500/20 text-slate-400 border-slate-500/30";
  };

  const getStatusDot = (status) => (
    <span
      className={`w-3 h-3 rounded-full ${
        status === "active" ? "bg-green-500" : "bg-slate-500"
      }`}
      title={status === "active" ? "Active" : "Inactive"}
    />
  );

  const formatDate = (isoDate) => {
    if (!isoDate) return "—";
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // CRUD Handlers
  const createUser = (data) => {
    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      ...data,
      lastLogin: null,
      ticketsHandled: data.role === "agent" ? 0 : null,
      rating: data.role === "agent" ? 0 : null,
      joinedAt: new Date().toISOString().split("T")[0],
    };
    setUsers((prev) => [...prev, newUser]);
    setModal({ open: false });
  };

  const updateUser = (id, data) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
    setModal({ open: false });
  };

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-3 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const currentUsers = filteredUsers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${textPrimary}`}>Team Members</h2>
          <p className={`mt-1 ${textMuted}`}>All users and support agents</p>
        </div>
        <button
          onClick={() => setModal({ open: true, type: "create" })}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium shadow-lg shadow-purple-500/20 hover:opacity-90 transition-opacity flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add User
        </button>
      </div>

      {/* Filters */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl border ${borderClass} ${cardBg}`}
      >
        <div>
          <label
            htmlFor="search"
            className={`block text-sm font-medium mb-2 ${textSecondary}`}
          >
            Search users
          </label>
          <input
            id="search"
            type="text"
            placeholder="Name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition ${
              isDark
                ? "bg-slate-800 border-slate-700 text-white"
                : "bg-white border-slate-300 text-slate-900"
            }`}
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className={`block text-sm font-medium mb-2 ${textSecondary}`}
          >
            Filter by role
          </label>
          <select
            id="role"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-transparent ${
              isDark
                ? "bg-slate-800 border-slate-700 text-slate-300"
                : "bg-slate-100 border-slate-300 text-slate-600"
            }`}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="agent">Agent</option>
          </select>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <div
              key={user.id}
              className={`rounded-2xl border p-5 transition-all duration-200 ${cardBg} ${borderClass} ${hoverCard} group`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${textPrimary}`}>
                      {user.name}
                    </h3>
                    <p className={`text-sm ${textMuted}`}>{user.email}</p>
                  </div>
                </div>
                {getStatusDot(user.status)}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full border ${getRoleBadgeClass(
                    user.role
                  )}`}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    isDark
                      ? "bg-slate-700 text-slate-300"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {user.department}
                </span>
              </div>

              <div className="mt-3 text-sm">
                <p className={`${textSecondary}`}>
                  Joined: {formatDate(user.joinedAt)}
                </p>
                {user.role === "agent" && (
                  <p className={`${textSecondary} mt-1`}>
                    {user.ticketsHandled} tickets • ★ {user.rating}
                  </p>
                )}
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() =>
                    setModal({ open: true, type: "view", data: user })
                  }
                  className={`flex-1 py-2 text-sm font-medium rounded-lg border ${borderClass} ${
                    isDark
                      ? "text-slate-300 hover:bg-slate-700"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  View
                </button>
                <button
                  onClick={() =>
                    setModal({ open: true, type: "edit", data: user })
                  }
                  className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                    isDark
                      ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg ${
                    user.status === "active"
                      ? "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      : "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                  }`}
                >
                  {user.status === "active" ? "Deact" : "Act"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <svg
              className={`w-16 h-16 mx-auto mb-4 ${textMuted}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <h3 className={`text-lg font-medium ${textPrimary}`}>
              No users found
            </h3>
            <p className={`mt-1 ${textMuted}`}>
              Try adjusting your search or filter.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {modal.open && modal.type === "create" && (
        <CreateUserModal
          onClose={() => setModal({ open: false })}
          onCreate={createUser}
        />
      )}
      {modal.open && modal.type === "edit" && modal.data && (
        <EditUserModal
          user={modal.data}
          onClose={() => setModal({ open: false })}
          onUpdate={updateUser}
        />
      )}
      {modal.open && modal.type === "view" && modal.data && (
        <ViewUserModal
          user={modal.data}
          onClose={() => setModal({ open: false })}
        />
      )}
    </div>
  );
};

export default UsersAgentsPage;
