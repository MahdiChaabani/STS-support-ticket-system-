// src/layout/MainLayout.jsx
import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("dark");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  // Initialize mock notifications
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        type: "ticket",
        title: "New ticket assigned",
        message: "TK-1045 has been assigned to you",
        time: "5 min ago",
        read: false,
      },
      {
        id: 2,
        type: "reply",
        title: "New reply on TK-1042",
        message: "Vasso Bert replied to your ticket",
        time: "1 hour ago",
        read: false,
      },
      {
        id: 3,
        type: "resolved",
        title: "Ticket resolved",
        message: "TK-1038 has been marked as resolved",
        time: "3 hours ago",
        read: true,
      },
    ]);
  }, []);

  // Close notification dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDark = theme === "dark";
  const bgClass = isDark ? "bg-slate-950" : "bg-white";
  const borderClass = isDark ? "border-slate-800" : "border-slate-200";
  const textPrimary = isDark ? "text-white" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";
  const textMuted = isDark ? "text-slate-500" : "text-slate-400";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");
  const markAsRead = (id) =>
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  const markAllAsRead = () =>
    setNotifications(notifications.map((n) => ({ ...n, read: true })));

  const renderIcon = (name, className = "w-6 h-6") => {
    const paths = {
      zap: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
      ticket: (
        <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      ),
      user: (
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      ),
      message: (
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      ),
      document: (
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      ),
      bell: (
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      ),
      logout: (
        <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      ),
      settings: (
        <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      ),
      home: (
        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      ),
    };
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[name]}
      </svg>
    );
  };

  // Navigation items matching your exact spec
  const navGroups = [
    {
      title: "MAIN",
      items: [
        { id: "dashboard", label: "Dashboard", path: "/", icon: "home" },
        { id: "tickets", label: "Tickets", path: "/tickets", icon: "ticket" },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        {
          id: "users",
          label: "Users / Agents",
          path: "/management/users",
          icon: "user",
        },
      ],
    },
    {
      title: "SUPPORT",
      items: [
        { id: "profile", label: "Profile", path: "/profile", icon: "user" },
        {
          id: "messages",
          label: "Messages",
          path: "/messages",
          icon: "message",
        },
        { id: "docs", label: "Documentation", path: "/docs", icon: "document" },
      ],
    },
    {
      title: "ACCOUNT",
      items: [
        {
          id: "settings",
          label: "Settings",
          path: "/settings",
          icon: "settings",
        },
        {
          id: "logout",
          label: "Logout",
          icon: "logout",
          action: () => {
            // Replace with real logout logic
            localStorage.removeItem("authToken");
            window.location.href = "/login";
          },
        },
      ],
    },
  ];

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
      setActiveNav(item.id);
    }
  };

  return (
    <div
      className={`flex h-screen overflow-hidden transition-colors duration-200 ${bgClass}`}
    >
      {/* Sidebar */}
      <div
        className={`w-72 border-r transition-colors duration-200 flex flex-col ${
          isDark ? "bg-slate-950" : "bg-white"
        } ${borderClass}`}
      >
        {/* Logo / Brand */}
        <div className="p-6 border-b border-inherit">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              {renderIcon("zap", "w-7 h-7 text-white")}
            </div>
            <div>
              <h2
                className={`text-base font-bold tracking-tight leading-tight ${textPrimary}`}
              >
                STS - Support Ticket System
              </h2>
              <p
                className={`text-xs font-semibold uppercase tracking-wider mt-1 ${textMuted}`}
              >
                Administrator
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          {navGroups.map((group, idx) => (
            <div key={idx} className="mb-6">
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-3 px-4 ${textMuted}`}
              >
                {group.title}
              </p>
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`w-full flex items-center gap-4 px-4 py-3 mb-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                    activeNav === item.id
                      ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30"
                      : isDark
                      ? "text-slate-400 hover:text-slate-300"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  {renderIcon(item.icon, "w-5 h-5 flex-shrink-0")}
                  <span className="text-left">{item.label}</span>
                </button>
              ))}
            </div>
          ))}
        </nav>

      
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div
          className={`border-b px-8 py-4 flex items-center justify-between ${
            isDark ? "bg-slate-900" : "bg-white"
          } ${borderClass}`}
        >
          <h1 className={`text-xl font-bold ${textPrimary}`}>
            {activeNav === "dashboard"
              ? "Dashboard"
              : activeNav === "tickets"
              ? "Tickets"
              : activeNav === "users"
              ? "Users / Agents"
              : activeNav === "profile"
              ? "Profile"
              : activeNav === "messages"
              ? "Messages"
              : activeNav === "docs"
              ? "Documentation"
              : activeNav === "settings"
              ? "Settings"
              : "STS"}
          </h1>

          <div className="flex items-center gap-3">
            {/* Theme Toggle - moved here */}
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
              }`}
              title={`Switch to ${isDark ? "light" : "dark"} theme`}
            >
              {isDark ? "🌙" : "☀️"}
            </button>

            {/* Notifications */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className={`relative w-10 h-10 rounded-lg border flex items-center justify-center ${
                  isDark
                    ? "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {renderIcon("bell", "w-5 h-5")}
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                  {notifications.filter((n) => !n.read).length}
                </span>
              </button>

              {notificationsOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-80 rounded-xl border shadow-xl z-50 ${
                    isDark
                      ? "bg-slate-800 border-slate-700"
                      : "bg-white border-slate-200"
                  }`}
                >
                  <div className={`p-4 border-b ${borderClass}`}>
                    <h3 className={`font-bold text-sm ${textPrimary}`}>
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-4 border-b cursor-pointer ${
                          isDark
                            ? "border-slate-700 hover:bg-slate-700/50"
                            : "border-slate-200 hover:bg-slate-50"
                        } ${
                          !n.read
                            ? isDark
                              ? "bg-slate-700/30"
                              : "bg-blue-50/50"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              n.type === "ticket"
                                ? "bg-blue-500/20"
                                : n.type === "reply"
                                ? "bg-purple-500/20"
                                : "bg-green-500/20"
                            }`}
                          >
                            {n.type === "ticket" &&
                              renderIcon("ticket", "w-4 h-4 text-blue-500")}
                            {n.type === "reply" &&
                              renderIcon("message", "w-4 h-4 text-purple-500")}
                            {n.type === "resolved" &&
                              renderIcon("check", "w-4 h-4 text-green-500")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`text-sm font-semibold ${textPrimary}`}
                            >
                              {n.title}
                            </h4>
                            <p className={`text-xs mt-1 ${textSecondary}`}>
                              {n.message}
                            </p>
                            <p className={`text-xs mt-1 ${textMuted}`}>
                              {n.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={`p-3 border-t ${borderClass}`}>
                    <button
                      onClick={markAllAsRead}
                      className={`w-full text-center text-sm font-medium py-2 rounded-lg ${
                        isDark
                          ? "text-purple-400 hover:bg-slate-700"
                          : "text-purple-600 hover:bg-slate-100"
                      }`}
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              MC
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div
          className={`flex-1 overflow-y-auto p-8 ${
            isDark ? "bg-slate-900" : "bg-white"
          }`}
        >
          <Outlet context={{ theme }} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
