// src/pages/ProfileSection.jsx
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const ProfileSection = () => {
  const { theme } = useOutletContext();
  const isDark = theme === "dark";

  // Theme classes
  const surface = isDark
    ? "bg-slate-800/80 backdrop-blur-sm border-slate-700/60"
    : "bg-white border-gray-200";
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-300" : "text-gray-600";
  const textMuted = isDark ? "text-gray-500" : "text-gray-500";

  // Tabs
  const [activeTab, setActiveTab] = useState("profile");

  // Profile State
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Mahdi Chaabani",
    email: "admin@sts.com",
    role: "Administrator",
    department: "Support Engineering",
    location: "Tunis, Tunisia",
    bio: "Building scalable support systems for enterprise clients.",
    avatar: "MC",
  });
  const [formData, setFormData] = useState({ ...profile });

  // Notifications
  const [notifications, setNotifications] = useState({
    email: true,
    tickets: true,
    replies: true,
    resolved: false,
  });

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const renderIcon = (name, className = "w-5 h-5") => {
    const paths = {
      user: (
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      ),
      mail: (
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      ),
      map: (
        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      ),
      lock: <path d="M12 15v3m-6 0h12M12 10a2 2 0 110-4 2 2 0 010 4z" />,
      bell: (
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      ),
      check: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
      users: (
        <path d="M12 4.286l6.571 5.143a2 2 0 01.429 2.571 5 5 0 01-4.714 3.143H9.714a5 5 0 01-4.714-3.143 2 2 0 01.429-2.571L12 4.286z" />
      ),
      link: (
        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L14 10" />
      ),
      x: <path d="M6 18L18 6M6 6l12 12" />,
    };
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {paths[name]}
      </svg>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>My Profile</h1>
        <p className={`text-sm ${textMuted} mt-1`}>
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Profile Card */}
        <div className="lg:col-span-1">
          <div className={`rounded-2xl border ${surface} p-6`}>
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-4">
                {profile.avatar}
              </div>
              <h2 className={`text-xl font-bold ${textPrimary}`}>
                {profile.name}
              </h2>
              <p className={`text-sm ${textSecondary}`}>{profile.role}</p>
              <p className={`text-xs ${textMuted} mt-1`}>
                {profile.department}
              </p>
            </div>
            <div className="space-y-4">
              <ProfileItem
                icon="mail"
                label="Email"
                value={profile.email}
                isDark={isDark}
                renderIcon={renderIcon}
              />
              <ProfileItem
                icon="map"
                label="Location"
                value={profile.location}
                isDark={isDark}
                renderIcon={renderIcon}
              />
              <ProfileItem
                icon="user"
                label="Role"
                value={profile.role}
                isDark={isDark}
                renderIcon={renderIcon}
              />
            </div>
            <button
              onClick={() => {
                setActiveTab("profile");
                setIsEditing(true);
              }}
              className="mt-6 w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Right: Tabs */}
        <div className="lg:col-span-2">
          {/* Tab Navigation */}
          <div
            className={`flex border-b mb-6 ${
              isDark ? "border-slate-700" : "border-gray-200"
            }`}
          >
            {[
              { id: "profile", label: "Profile" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3 font-medium text-sm ${
                  activeTab === tab.id
                    ? isDark
                      ? "text-white border-b-2 border-purple-500"
                      : "text-gray-900 border-b-2 border-purple-600"
                    : isDark
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              {/* Bio */}
              <div className={`rounded-2xl border ${surface} p-6`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${textPrimary}`}>
                    Bio
                  </h3>
                  {isEditing && (
                    <button
                      onClick={handleSave}
                      className="text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                    >
                      Save
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows="3"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      isDark
                        ? "bg-slate-700/50 border-slate-600 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  />
                ) : (
                  <p className={`text-sm ${textSecondary} whitespace-pre-line`}>
                    {profile.bio}
                  </p>
                )}
              </div>


              {/* Security */}
              <div className={`rounded-2xl border ${surface} p-6`}>
                <h3 className={`text-lg font-semibold mb-4 ${textPrimary}`}>
                  Security
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${textPrimary}`}>Password</h4>
                      <p className={`text-sm ${textMuted}`}>
                        Last changed 2 months ago
                      </p>
                    </div>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-700/30 text-slate-300 hover:bg-slate-600/30">
                      Change
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-medium ${textPrimary}`}>
                        Two-factor authentication
                      </h4>
                      <p className={`text-sm ${textMuted}`}>Not enabled</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-700/30 text-slate-300 hover:bg-slate-600/30">
                      Enable
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className={`w-full max-w-2xl rounded-2xl ${surface} p-6`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-xl font-bold ${textPrimary}`}>
                Edit Profile
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-500 hover:text-gray-300"
              >
                {renderIcon("x", "w-6 h-6")}
              </button>
            </div>
            <div className="space-y-4">
              <InputField
                label="Full Name"
                value={formData.name}
                onChange={(v) => setFormData({ ...formData, name: v })}
                isDark={isDark}
              />
              <InputField
                label="Email"
                value={formData.email}
                onChange={(v) => setFormData({ ...formData, email: v })}
                isDark={isDark}
              />
              <InputField
                label="Location"
                value={formData.location}
                onChange={(v) => setFormData({ ...formData, location: v })}
                isDark={isDark}
              />
              <TextareaField
                label="Bio"
                value={formData.bio}
                onChange={(v) => setFormData({ ...formData, bio: v })}
                isDark={isDark}
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsEditing(false)}
                className={`px-4 py-2.5 rounded-xl font-medium ${
                  isDark
                    ? "text-gray-300 hover:bg-slate-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Subcomponents ---
const ProfileItem = ({ icon, label, value, isDark, renderIcon }) => (
  <div className="flex items-center gap-3">
    <div
      className={`p-2 rounded-lg ${isDark ? "bg-slate-700/50" : "bg-gray-100"}`}
    >
      {renderIcon(icon, "w-4 h-4")}
    </div>
    <div>
      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {label}
      </p>
      <p
        className={`text-sm font-medium ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

const InputField = ({ label, value, onChange, isDark }) => (
  <div>
    <label
      className={`block text-sm font-medium mb-2 ${
        isDark ? "text-gray-300" : "text-gray-700"
      }`}
    >
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 rounded-xl border ${
        isDark
          ? "bg-slate-700/50 border-slate-600 text-white"
          : "bg-white border-gray-300"
      }`}
    />
  </div>
);

const TextareaField = ({ label, value, onChange, isDark }) => (
  <div>
    <label
      className={`block text-sm font-medium mb-2 ${
        isDark ? "text-gray-300" : "text-gray-700"
      }`}
    >
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows="3"
      className={`w-full px-4 py-3 rounded-xl border ${
        isDark
          ? "bg-slate-700/50 border-slate-600 text-white"
          : "bg-white border-gray-300"
      }`}
    />
  </div>
);

export default ProfileSection;
