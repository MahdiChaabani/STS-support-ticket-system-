
import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { theme } = useOutletContext(); // Get theme from MainLayout
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

  // no mock data; load from backend
  const initialTickets = [];

  useEffect(() => {
    const API = 'http://localhost:8082/api';
    let mounted = true;
    fetch(`${API}/tickets`).then(r => r.ok ? r.json() : Promise.reject()).then(data => {
      if (!mounted) return;
      if (Array.isArray(data)) {
        setTickets(data);
        return;
      }
      setTickets([]);
    }).catch(() => {
      setTickets([]);
    });
    return () => { mounted = false };
  }, []);

  const isDark = theme === 'dark';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';

  // determine user role from localStorage
  const [currentUser, setCurrentUser] = React.useState(null);
  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setCurrentUser(JSON.parse(stored));
  }, []);

  // stats: if admin show all, otherwise only user's tickets
  const userTickets = currentUser ? tickets.filter(t => (t.requester === currentUser.email || t.requester === currentUser.username || t.assignee === currentUser.name)) : [];
  const stats = [
    { title: 'TOTAL TICKETS', value: (currentUser && currentUser.role !== 'admin') ? userTickets.length : tickets.length, color: 'from-indigo-500 to-purple-600', icon: 'clipboard' },
    { title: 'OPEN TICKETS', value: (currentUser && currentUser.role !== 'admin') ? userTickets.filter(t => t.status === 'open').length : tickets.filter(t => t.status === 'open').length, color: 'from-purple-600 to-blue-600', icon: 'clock' },
    { title: 'IN PROGRESS', value: (currentUser && currentUser.role !== 'admin') ? userTickets.filter(t => t.status === 'in-progress').length : tickets.filter(t => t.status === 'in-progress').length, color: 'from-blue-600 to-purple-600', icon: 'zap' },
    { title: 'RESOLVED', value: (currentUser && currentUser.role !== 'admin') ? userTickets.filter(t => t.status === 'resolved').length : tickets.filter(t => t.status === 'resolved').length, color: 'from-purple-500 to-blue-500', icon: 'check' }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicketForm.title.trim() || !newTicketForm.description.trim()) return;

    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;
    const API = 'http://localhost:8082/api';
    const payload = {
      category: newTicketForm.category,
      title: newTicketForm.title,
      description: newTicketForm.description,
      priority: newTicketForm.priority,
      status: 'open',
      assignee: 'Mahdi Chaabani',
      requester: user?.email || user?.username || 'anonymous'
    };
    fetch(`${API}/tickets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(async r => {
      if (!r.ok) throw new Error('create failed');
      const created = await r.json();
      setTickets(prev => [created, ...prev]);
      setNewTicketForm({ title: '', description: '', category: 'TECHNICAL', priority: 'medium' });
      setShowCreateTicket(false);
    }).catch(() => {
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
    });
  };

  const renderIcon = (name, className = "w-6 h-6") => {
    const paths = {
      clipboard: <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
      clock: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      zap: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
      check: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
      plus: <path d="M12 4v16m8-8H4" />,
      message: <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
    };
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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
            onClick={() => navigate('/admin/tickets')}
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

// Helper functions
const getStatusBadge = (status) =>
  ({ open: 'bg-cyan-500', 'in-progress': 'bg-blue-500', resolved: 'bg-emerald-500' })[status] || '';

const getPriorityBadge = (priority) =>
  ({ high: 'bg-red-500', medium: 'bg-orange-500', low: 'bg-gray-500' })[priority] || '';

// StatCard Component
const StatCard = ({ stat, isDark, renderIcon }) => {
  return (
    <div className={`border rounded-xl p-6 cursor-pointer group transition-all duration-200 ${
      isDark
        ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/10'
        : 'bg-white border-gray-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center shadow-md`}>
          {renderIcon(stat.icon, 'w-6 h-6 text-white')}
        </div>
        <div>
          <h3 className={`text-xs font-semibold uppercase tracking-widest mb-1 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {stat.title}
          </h3>
          <span className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {stat.value}
          </span>
        </div>
      </div>
    </div>
  );
};

// FilterSelect Component
const FilterSelect = ({ label, value, onChange, options, isDark }) => (
  <div className="flex items-center gap-2">
    <label className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
      {label}:
    </label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`px-4 py-2 rounded-lg border font-medium text-sm focus:outline-none focus:ring-2 transition-colors ${
        isDark
          ? 'bg-slate-800 border-slate-700 text-white focus:ring-purple-500/20 focus:border-purple-500'
          : 'bg-white border-gray-300 text-gray-900 focus:ring-purple-500/20 focus:border-purple-500'
      }`}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

// TicketCard Component
const TicketCard = ({ ticket, isDark, getStatusBadge, getPriorityBadge, renderIcon, onClick }) => {
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-300' : 'text-gray-600';
  const textMuted = isDark ? 'text-gray-400' : 'text-gray-500';
  const borderClass = isDark ? 'border-slate-700' : 'border-gray-200';

  return (
    <div 
      onClick={onClick}
      className={`border rounded-xl p-6 cursor-pointer group transition-all duration-200 ${
        isDark
          ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-500/10'
          : 'bg-white border-gray-300 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
            isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
          }`}>
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

      <div className={`text-xs font-semibold uppercase tracking-wider mb-2 ${textMuted}`}>
        {ticket.category}
      </div>
      <h3 className={`text-lg font-bold mb-3 ${textPrimary}`}>
        {ticket.title}
      </h3>
      <p className={`text-sm mb-4 line-clamp-2 ${textSecondary}`}>
        {ticket.description}
      </p>

      <div className={`pt-4 border-t flex items-center justify-between ${borderClass}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            {ticket.assignee.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <p className={`text-xs font-medium ${textPrimary}`}>
              {ticket.assignee}
            </p>
            <p className={`text-xs ${textMuted}`}>
              {ticket.time}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {renderIcon('message', `w-4 h-4 ${textMuted}`)}
          <span className={`text-sm font-bold ${textSecondary}`}>
            {ticket.replies}
          </span>
        </div>
      </div>
    </div>
  );
};

// CreateTicketModal Component
const CreateTicketModal = ({ newTicketForm, setNewTicketForm, isDark, handleCreateTicket, setShowCreateTicket }) => {
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const borderClass = isDark ? 'border-slate-700' : 'border-gray-200';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl rounded-2xl border ${
        isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
      }`}>
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
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-white placeholder:text-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
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
              className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-white placeholder:text-gray-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-400'
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
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-slate-900 border-slate-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
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
                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                  isDark 
                    ? 'bg-slate-900 border-slate-700 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
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
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isDark 
                  ? 'text-gray-300 hover:bg-slate-700' 
                  : 'text-gray-600 hover:bg-gray-100'
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