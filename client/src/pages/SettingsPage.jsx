import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const SettingsPage = () => {
  // ✅ Get theme & toggle function from MainLayout
  const { theme, toggleTheme } = useOutletContext();
  const isDark = theme === "dark";

  // ✅ Color classes matching MainLayout
  const bgCard = isDark ? "bg-slate-800" : "bg-white";
  const borderClass = isDark ? "border-slate-700" : "border-slate-200";
  const textPrimary = isDark ? "text-slate-100" : "text-slate-900";
  const textSecondary = isDark ? "text-slate-400" : "text-slate-600";
  const textMuted = isDark ? "text-slate-500" : "text-slate-500";
  const bgInput = isDark ? "bg-slate-900" : "bg-white";
  const hoverBg = isDark ? "hover:bg-slate-700" : "hover:bg-slate-50";
  const focusRing = isDark
    ? "focus:ring-purple-500 focus:border-purple-500"
    : "focus:ring-purple-400 focus:border-purple-400";
    const [activeTab, setActiveTab] = useState("general");

  // ✅ Mock settings — replace with real API data later
  const [settings, setSettings] = useState({
    companyName: "STS Solutions",
    supportEmail: "support@sts.com",
    phone: "+216 93 245 735",
    autoAssign: true,
    slaHours: 8,
    emailNotifications: true,
    newTickets: true,
    replies: true,
    resolvedTickets: false,
    slackConnected: true,
    webhookUrl: "https://webhook.sts.com/notify",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const tabs = [
    { id: "general", label: "General" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className={`text-2xl font-bold ${textPrimary} mb-6`}>Settings</h1>

      {/* Tabs */}
      <div className={`flex border-b ${borderClass}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-purple-500 text-purple-500"
                : `${textSecondary} border-transparent hover:${textPrimary}`
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8 space-y-6">
        {/* 🔧 General */}
        {activeTab === "general" && (
          <>
            <div className={`rounded-xl border ${borderClass} ${bgCard} p-6`}>
              <h2 className={`text-lg font-semibold ${textPrimary} mb-4`}>
                Company Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${textSecondary}`}
                  >
                    Company Name
                  </label>
                  <input
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} ${bgInput} ${textPrimary} placeholder:${textMuted} focus:outline-none ${focusRing}`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${textSecondary}`}
                  >
                    Support Email
                  </label>
                  <input
                    name="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} ${bgInput} ${textPrimary} placeholder:${textMuted} focus:outline-none ${focusRing}`}
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-1 ${textSecondary}`}
                  >
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    value={settings.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 rounded-lg border ${borderClass} ${bgInput} ${textPrimary} placeholder:${textMuted} focus:outline-none ${focusRing}`}
                  />
                </div>
              </div>
            </div>

           

            <div className="flex gap-3">
              <button
                onClick={() => console.log("Saved:", settings)}
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow hover:opacity-90 transition"
              >
                Save Changes
              </button>
              <button
                className={`px-5 py-2.5 rounded-lg border ${borderClass} ${textPrimary} ${hoverBg}`}
              >
                Reset to Defaults
              </button>
            </div>
          </>
        )}

       

        {/* 🔔 Notifications */}
        {activeTab === "notifications" && (
          <div className={`rounded-xl border ${borderClass} ${bgCard} p-6`}>
            <h2 className={`text-lg font-semibold ${textPrimary} mb-4`}>
              Global Notification Preferences
            </h2>
            <div className="space-y-4">
              {[
                { id: "emailNotifications", label: "📧 Email Notifications" },
                { id: "newTickets", label: "🔔 New Tickets" },
                { id: "replies", label: "💬 Replies" },
                { id: "resolvedTickets", label: "✅ Resolved Tickets" },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <span className={`font-medium ${textPrimary}`}>
                    {item.label}
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name={item.id}
                      checked={settings[item.id]}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 rounded-full peer ${
                        isDark
                          ? "bg-slate-700 peer-checked:bg-purple-600"
                          : "bg-slate-200 peer-checked:bg-purple-600"
                      } peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                    ></div>
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() =>
                  console.log("Saved notification prefs:", settings)
                }
                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg shadow hover:opacity-90 transition"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default SettingsPage;
