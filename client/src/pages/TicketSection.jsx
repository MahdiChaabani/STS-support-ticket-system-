// src/pages/TicketSection.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TicketSection = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState('dark');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [tickets, setTickets] = useState([]);
  const [newTicketForm, setNewTicketForm] = useState({
    title: '',
    description: '',
    category: 'TECHNICAL',
    priority: 'medium'
  });
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Initial ticket data
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
    if (initialTickets.length > 0) {
      setSelectedTicket(initialTickets[0]);
    }
  }, []);

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-slate-950' : 'bg-slate-50';
  const borderClass = isDark ? 'border-slate-800' : 'border-slate-200';
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const textMuted = isDark ? 'text-slate-500' : 'text-slate-400';

  const getStatusBadge = (status) =>
    ({ open: 'bg-cyan-500', 'in-progress': 'bg-blue-500', resolved: 'bg-emerald-500' })[status] || '';

  const getPriorityBadge = (priority) =>
    ({ high: 'bg-red-500', medium: 'bg-orange-500', low: 'bg-gray-500' })[priority] || '';

  const renderIcon = (name, className = "w-6 h-6") => {
    const paths = {
      ticket: <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />,
      message: <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
      user: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
      clock: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      plus: <path d="M12 4v16m8-8H4" />,
      search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
      check: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    };
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {paths[name]}
      </svg>
    );
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
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
    setSelectedTicket(newTicket);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className={`mb-6 flex items-center gap-2 text-sm font-medium ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
      >
        ← Back
      </button>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Support Tickets</h1>
        <button 
          onClick={() => setShowCreateTicket(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
        >
          {renderIcon('plus', 'w-4 h-4')}
          Create Ticket
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative max-w-md">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`}>
            {renderIcon('search', 'w-5 h-5')}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tickets..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

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

      {/* Ticket List + Detail View */}
      <div className="flex h-[calc(100vh-220px)] gap-6">
        {/* Left: Ticket List */}
        <div className="w-1/3 overflow-y-auto">
          {filteredTickets.map(ticket => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              isDark={isDark} 
              getStatusBadge={getStatusBadge} 
              getPriorityBadge={getPriorityBadge} 
              renderIcon={renderIcon} 
              isSelected={selectedTicket?.id === ticket.id}
              onClick={() => handleTicketClick(ticket)}
            />
          ))}
        </div>

        {/* Right: Ticket Detail */}
        <div className="w-2/3">
          {selectedTicket ? (
            <TicketDetail 
              ticket={selectedTicket}
              isDark={isDark}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
              textMuted={textMuted}
              borderClass={borderClass}
              renderIcon={renderIcon}
              getStatusBadge={getStatusBadge}
              getPriorityBadge={getPriorityBadge}
            />
          ) : (
            <div className={`flex items-center justify-center h-full rounded-xl border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <p className={`text-lg ${textSecondary}`}>Select a ticket to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateTicket && (
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
                  placeholder="Provide detailed information..."
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
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Sub-components ---
const FilterSelect = ({ label, value, onChange, options, isDark }) => (
  <div className="flex items-center gap-2">
    <label className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{label}:</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`px-3 py-2 rounded-lg border text-sm ${
        isDark
          ? 'bg-slate-800 border-slate-700 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const TicketCard = ({ ticket, isDark, getStatusBadge, getPriorityBadge, renderIcon, isSelected, onClick }) => {
  const textPrimary = isDark ? 'text-white' : 'text-slate-900';
  const textSecondary = isDark ? 'text-slate-400' : 'text-slate-600';
  const borderClass = isDark ? 'border-slate-700' : 'border-slate-200';

  return (
    <div 
      className={`border rounded-xl p-4 mb-4 cursor-pointer ${
        isSelected 
          ? isDark ? 'border-purple-500 bg-slate-800' : 'border-purple-400 bg-slate-50'
          : isDark ? 'border-slate-700 hover:bg-slate-800/70' : 'border-slate-200 hover:bg-slate-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <span className={`text-xs font-bold px-2 py-1 rounded ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
          {ticket.id}
        </span>
        <span className={`px-2 py-1 rounded text-white text-xs font-bold ${getStatusBadge(ticket.status)}`}>
          {ticket.status.toUpperCase()}
        </span>
      </div>
      <div className={`text-xs font-semibold mb-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{ticket.category}</div>
      <h3 className={`font-bold ${textPrimary}`}>{ticket.title}</h3>
      <p className={`text-sm mt-2 mb-3 line-clamp-2 ${textSecondary}`}>{ticket.description}</p>
      <div className={`pt-3 border-t flex items-center justify-between ${borderClass}`}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {ticket.assignee.split(' ').map(n => n[0]).join('')}
          </div>
          <span className={`text-xs ${textSecondary}`}>{ticket.assignee}</span>
        </div>
        <div className="flex items-center gap-1">
          {renderIcon('message', 'w-4 h-4 text-slate-400')}
          <span className={`text-sm font-bold ${textSecondary}`}>{ticket.replies}</span>
        </div>
      </div>
    </div>
  );
};

const TicketDetail = ({ ticket, isDark, textPrimary, textSecondary, textMuted, borderClass, renderIcon, getStatusBadge, getPriorityBadge }) => (
  <div className={`border rounded-xl p-6 h-full ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className={`text-2xl font-bold ${textPrimary}`}>{ticket.title}</h2>
        <p className={`text-sm ${textSecondary}`}>{ticket.id}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getStatusBadge(ticket.status)}`}>
          {ticket.status.replace('-', ' ').toUpperCase()}
        </span>
        <span className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getPriorityBadge(ticket.priority)}`}>
          {ticket.priority.toUpperCase()}
        </span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6 mb-6">
      <DetailItem label="Customer" value={ticket.assignee} icon="user" renderIcon={renderIcon} textPrimary={textPrimary} textSecondary={textSecondary} />
      <DetailItem label="Assignee" value="Mike Chen" icon="user" renderIcon={renderIcon} textPrimary={textPrimary} textSecondary={textSecondary} />
      <DetailItem label="Created" value={ticket.time} icon="clock" renderIcon={renderIcon} textPrimary={textPrimary} textSecondary={textSecondary} />
      <DetailItem label="Category" value={ticket.category} icon="ticket" renderIcon={renderIcon} textPrimary={textPrimary} textSecondary={textSecondary} />
    </div>

    <div className="mb-6">
      <h3 className={`text-lg font-semibold mb-3 ${textPrimary}`}>Issue Description</h3>
      <div className={`p-4 rounded-lg ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}>
        <p className={`text-sm ${textSecondary}`}>{ticket.description}</p>
      </div>
    </div>

    <div className="mb-6">
      <h3 className={`text-lg font-semibold mb-3 ${textPrimary}`}>Conversation History</h3>
      <div className={`space-y-4 ${isDark ? 'bg-slate-700' : 'bg-slate-50'} p-4 rounded-lg`}>
        <ConversationItem 
          initials="SJ" 
          name="Sarah Johnson" 
          time="Oct 17, 9:30 AM" 
          message={ticket.description} 
          isDark={isDark} 
          textPrimary={textPrimary} 
          textSecondary={textSecondary} 
        />
        <ConversationItem 
          initials="MC" 
          name="Mike Chen" 
          time="Staff • Oct 17, 9:45 AM" 
          message="Hi Sarah, I'm sorry to hear you're having trouble logging in. Let me look into this for you..." 
          isDark={isDark} 
          textPrimary={textPrimary} 
          textSecondary={textSecondary} 
        />
      </div>
    </div>

    <div className="flex gap-3">
      <ActionButton isDark={isDark}>Reply</ActionButton>
      <ActionButton isDark={isDark}>Assign</ActionButton>
      <ActionButton isDark={isDark}>Change Status</ActionButton>
    </div>
  </div>
);

const DetailItem = ({ label, value, icon, renderIcon, textPrimary, textSecondary }) => (
  <div>
    <div className="flex items-center gap-2 mb-2">
      {renderIcon(icon, 'w-5 h-5 text-slate-400')}
      <span className={`text-sm font-medium ${textSecondary}`}>{label}</span>
    </div>
    <p className={`text-sm ${textPrimary}`}>{value}</p>
  </div>
);

const ConversationItem = ({ initials, name, time, message, isDark, textPrimary, textSecondary }) => (
  <div className="flex gap-3">
    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
      {initials}
    </div>
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-sm font-medium ${textPrimary}`}>{name}</span>
        <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{time}</span>
      </div>
      <div className={`p-3 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-sm`}>
        <p className={`text-sm ${textSecondary}`}>{message}</p>
      </div>
    </div>
  </div>
);

const ActionButton = ({ isDark, children }) => (
  <button className={`px-4 py-2 rounded-lg font-medium ${
    isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
  }`}>
    {children}
  </button>
);

export default TicketSection;