// src/components/CreateTicketModal.jsx
import React from "react";

const CreateTicketModal = ({
  newTicketForm,
  setNewTicketForm,
  isDark,
  handleCreateTicket,
  setShowCreateTicket,
}) => {
  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-gray-400" : "text-gray-600";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-2xl rounded-2xl border ${
          isDark ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
        }`}
      >
        <div
          className={`p-6 border-b ${
            isDark ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <h2 className={`text-xl font-bold ${textPrimary}`}>
            Create New Ticket
          </h2>
        </div>
        <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${textSecondary}`}
            >
              Title
            </label>
            <input
              type="text"
              value={newTicketForm.title}
              onChange={(e) =>
                setNewTicketForm({ ...newTicketForm, title: e.target.value })
              }
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-white placeholder:text-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              }`}
              placeholder="Brief description of the issue"
              required
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${textSecondary}`}
            >
              Description
            </label>
            <textarea
              value={newTicketForm.description}
              onChange={(e) =>
                setNewTicketForm({
                  ...newTicketForm,
                  description: e.target.value,
                })
              }
              rows="4"
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark
                  ? "bg-slate-900 border-slate-700 text-white placeholder:text-gray-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
              }`}
              placeholder="Provide detailed information..."
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${textSecondary}`}
              >
                Category
              </label>
              <select
                value={newTicketForm.category}
                onChange={(e) =>
                  setNewTicketForm({
                    ...newTicketForm,
                    category: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="TECHNICAL">Technical</option>
                <option value="BILLING">Billing</option>
                <option value="FEATURE REQUEST">Feature Request</option>
                <option value="BUG REPORT">Bug Report</option>
              </select>
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${textSecondary}`}
              >
                Priority
              </label>
              <select
                value={newTicketForm.priority}
                onChange={(e) =>
                  setNewTicketForm({
                    ...newTicketForm,
                    priority: e.target.value,
                  })
                }
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDark
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowCreateTicket(false)}
              className={`px-6 py-3 rounded-lg font-medium ${
                isDark
                  ? "text-gray-300 hover:bg-slate-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
