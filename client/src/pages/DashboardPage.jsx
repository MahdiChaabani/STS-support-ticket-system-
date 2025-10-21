// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [tickets, setTickets] = useState([]);
  const [newTicketForm, setNewTicketForm] = useState({
    title: '',
    description: '',
    category: 'TECHNICAL',
    priority: 'medium'
  });
  const [showCreateTicket, setShowCreateTicket] = useState(false);

  const initialTickets = [
    { id: 'TK-1042', category: 'TECHNICAL', title: 'Login Authentication Issue', description: 'Unable to authenticate using OAuth provider...', status: 'in-progress', priority: 'high', time: '2 hours ago', replies: 3, assignee: 'Vasso Bert' },
    { id: 'TK-1041', category: 'BILLING', title: 'Payment Method Update', description: 'Need assistance updating payment method...', status: 'open', priority: 'medium', time: '5 hours ago', replies: 1, assignee: 'Mohamed Ali' },
    { id: 'TK-1038', category: 'FEATURE REQUEST', title: 'Dark Mode for Mobile App', description: 'Request to implement dark mode...', status: 'in-progress', priority: 'low', time: '1 day ago', replies: 5, assignee: 'Donald Akeem' },
    { id: 'TK-1035', category: 'BUG REPORT', title: 'Dashboard Data Not Loading', description: 'Dashboard analytics widgets are showing empty state...', status: 'resolved', priority: 'high', time: '3 days ago', replies: 8, assignee: 'Mahdi Chaabani' },
    { id: 'TK-1033', category: 'TECHNICAL', title: 'API Rate Limit Issues', description: 'Experiencing frequent rate limit errors...', status: 'open', priority: 'high', time: '4 days ago', replies: 2, assignee: 'Sarah Johnson' },
    { id: 'TK-1030', category: 'FEATURE REQUEST', title: 'Export Data Feature', description: 'Add ability to export user data...', status: 'in-progress', priority: 'medium', time: '5 days ago', replies: 7, assignee: 'Alex Chen' }
  ];

  useEffect(() => {
    setTickets(initialTickets);
  }, []);

  const isDark = theme === 'dark';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';

  const stats = [
    { title: 'TOTAL TICKETS', value: tickets.length, color: 'from-indigo-500 to-purple-600', icon: 'clipboard' },
    { title: 'OPEN TICKETS', value: tickets.filter(t => t.status === 'open').length, color: 'from-purple-600 to-blue-600', icon: 'clock' },
    { title: 'IN PROGRESS', value: tickets.filter(t => t.status === 'in-progress').length, color: 'from-blue-600 to-purple-600', icon: 'zap' },
    { title: 'RESOLVED', value: tickets.filter(t => t.status === 'resolved').length, color: 'from-purple-500 to-blue-500', icon: 'check' }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicketForm.title.trim() || !newTicketForm.description.trim()) return;

    const newTicket = {
      id: `TK-${1045 + tickets.length}`,
      ...newTicketForm,
      status: 'open',
      time: 'Just now',
      replies: 0,
      assignee: 'Mahdi Chaabani'
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketForm({ title: '', description: '', category: 'TECHNICAL', priority: 'medium' });
    setShowCreateTicket(false);
  };

  const renderIcon = (name, className = "w-6 h-6") => {
    const paths = {
      clipboard: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
      clock: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      zap: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
      check: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
      plus: <path d="M12 4v16m8-8H4" />,
    };
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {paths[name]}
    </svg>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>Dashboard</h1>
          <p className={`text-sm ${textSecondary}`}>Welcome back, Mahdi 👋</p>
        </div>
        <button 
          onClick={() => setShowCreateTicket(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
        >
          {renderIcon('plus', 'w-5 h-5')}
          Create Ticket
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <StatCard key={i} stat={stat} isDark={isDark} renderIcon={renderIcon} />
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <FilterSelect 
          label="Status" 
          value={statusFilter} 
          onChange={setStatusFilter} 
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'open', label: 'Open' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'resolved', label: 'Resolved' }
          ]} 
          isDark={isDark} 
        />
        <FilterSelect 
          label="Priority" 
          value={priorityFilter} 
          onChange={setPriorityFilter} 
          options={[
            { value: 'all', label: 'All Priority' },
            { value: 'high', label: 'High' },
            { value: 'medium', label: 'Medium' },
            { value: 'low', label: 'Low' }
          ]} 
          isDark={isDark} 
        />
      </div>

      {/* Ticket Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTickets.map(ticket => (
          <TicketCard 
            key={ticket.id} 
            ticket={ticket} 
            isDark={isDark} 
            getStatusBadge={getStatusBadge} 
            getPriorityBadge={getPriorityBadge} 
            renderIcon={renderIcon} 
            onClick={() => navigate('/tickets')}
          />
        ))}
      </div>

      {/* Create Ticket Modal */}
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

// --- Reusable components (same as before) ---
const getStatusBadge = (status) =>
  ({ open: 'bg-cyan-500', 'in-progress': 'bg-blue-500', resolved: 'bg-emerald-500' })[status] || '';

const getPriorityBadge = (priority) =>
  ({ high: 'bg-red-500', medium: 'bg-orange-500', low: 'bg-gray-500' })[priority] || '';

const StatCard = ({ stat, isDark, renderIcon }) => {
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textMuted = isDark ? 'text-slate-500' : 'text-slate-400';

  return (
    <div className={`border rounded-xl p-6 cursor-pointer group ${
      isDark
        ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:from-slate-800 hover:to-slate-800/80 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/10'
        : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200 hover:from-slate-50 hover:to-white hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-md`}>
          {renderIcon(stat.icon, 'w-6 h-6 text-white')}
        </div>
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-widest mb-1 ${textMuted}`}>{stat.title}</h3>
          <span className={`text-3xl font-bold ${textPrimary}`}>{stat.value}</span>
        </div>
      </div>
    </div>
  );
};

const FilterSelect = ({ label, value, onChange, options, isDark }) => (
  <div className="flex items-center gap-2">
    <label className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{label}:</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`px-4 py-2 rounded-lg border font-medium text-sm focus:outline-none focus:ring-2 ${
        isDark
          ? 'bg-slate-800 border-slate-700 text-white focus:ring-purple-500/20 focus:border-purple-500'
          : 'bg-white border-slate-200 text-slate-900 focus:ring-purple-500/20 focus:border-purple-500'
      }`}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const TicketCard = ({ ticket, isDark, getStatusBadge, getPriorityBadge, renderIcon, onClick }) => {
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const textMuted = isDark ? 'text-slate-500' : 'text-slate-400';
  const borderClass = isDark ? 'border-slate-700' : 'border-slate-200';

  return (
    <div 
      onClick={onClick}
      className={`border rounded-xl p-6 cursor-pointer group ${
        isDark
          ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:from-slate-800 hover:to-slate-800/80 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/10'
          : 'bg-gradient-to-br from-white to-slate-50/50 border-slate-200 hover:from-slate-50 hover:to-white hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-lg ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
            {ticket.id}
          </span>
          <span className={`px-2 py-1 rounded-md text-white text-xs font-bold ${getStatusBadge(ticket.status)}`}>
            {ticket.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-md text-white text-xs font-bold ${getPriorityBadge(ticket.priority)}`}>
          {ticket.priority.toUpperCase()}
        </span>
      </div>

      <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${textMuted}`}>{ticket.category}</div>
      <h3 className={`text-lg font-bold mb-3 ${textPrimary}`}>{ticket.title}</h3>
      <p className={`text-sm mb-4 line-clamp-2 ${textSecondary}`}>{ticket.description}</p>

      <div className={`pt-4 border-t flex items-center justify-between ${borderClass}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            {ticket.assignee.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className={`text-xs font-medium ${textPrimary}`}>{ticket.assignee}</p>
            <p className={`text-xs ${textMuted}`}>{ticket.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {renderIcon('message', 'w-4 h-4 text-slate-400')}
          <span className={`text-sm font-bold ${textSecondary}`}>{ticket.replies}</span>
        </div>
      </div>
    </div>
  );
};

const CreateTicketModal = ({ newTicketForm, setNewTicketForm, isDark, handleCreateTicket, setShowCreateTicket }) => {
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const borderClass = isDark ? 'border-slate-700' : 'border-slate-200';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl rounded-2xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className={`p-6 border-b ${borderClass}`}>
          <h2 className={`text-xl font-bold ${textPrimary}`}>Create New Ticket</h2>
        </div>
        <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>Title</label>
            <input
              type="text"
              value={newTicketForm.title}
              onChange={(e) => setNewTicketForm({...newTicketForm, title: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
              placeholder="Brief description of the issue"
              required
            />
          </div>
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>Description</label>
            <textarea
              value={newTicketForm.description}
              onChange={(e) => setNewTicketForm({...newTicketForm, description: e.target.value})}
              rows="4"
              className={`w-full px-4 py-3 rounded-lg border ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
              placeholder="Provide detailed information about your issue..."
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>Category</label>
              <select
                value={newTicketForm.category}
                onChange={(e) => setNewTicketForm({...newTicketForm, category: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option value="TECHNICAL">Technical</option>
                <option value="BILLING">Billing</option>
                <option value="FEATURE REQUEST">Feature Request</option>
                <option value="BUG REPORT">Bug Report</option>
              </select>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${textSecondary}`}>Priority</label>
              <select
                value={newTicketForm.priority}
                onChange={(e) => setNewTicketForm({...newTicketForm, priority: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg border ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
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
                isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'
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

export default DashboardPage;