
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const TicketSection = () => {
  const navigate = useNavigate();
  const { theme } = useOutletContext();

  // === State ===
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
  const [replyText, setReplyText] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);
  const conversationEndRef = useRef(null);

  // === Mock Data ===
  // no mock data: rely on backend for tickets
  const initialTickets = [];

  useEffect(() => {
    const API = 'http://localhost:8082/api';
    let mounted = true;
    fetch(`${API}/tickets`).then(r => {
      if (!r.ok) throw new Error('no tickets');
      return r.json();
    }).then(data => {
      if (!mounted) return;
      if (Array.isArray(data)) {
        setTickets(data);
        if (data.length > 0) setSelectedTicket(data[0]);
        return;
      }
      setTickets([]);
    }).catch(() => {
      setTickets([]);
    });
    return () => { mounted = false };
  }, []);

  // === Theme Classes ===
  const isDark = theme === 'dark';
  const surface = isDark 
    ? 'bg-slate-900/80 backdrop-blur-sm border-slate-800/60' 
    : 'bg-white border-gray-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-300' : 'text-gray-600';
  const textMuted = isDark ? 'text-gray-500' : 'text-gray-500';

  // === Icon Renderer ===
  const renderIcon = (name, className = "w-4 h-4") => {
    const paths = {
      ticket: <path d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />,
      message: <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
      user: <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
      clock: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      plus: <path d="M12 4v16m8-8H4" />,
      search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
      send: <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />,
      paperclip: <path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />,
      x: <path d="M6 18L18 6M6 6l12 12" />,
      emoji: <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-9H6v2h12V5z" />
    };
    return (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {paths[name]}
      </svg>
    );
  };

  // === Status & Priority Config ===
  const getStatusConfig = (status) => ({
    open: { label: 'OPEN', color: 'bg-cyan-500/20 text-cyan-400' },
    'in-progress': { label: 'IN PROGRESS', color: 'bg-blue-500/20 text-blue-400' },
    resolved: { label: 'RESOLVED', color: 'bg-emerald-500/20 text-emerald-400' }
  }[status] || { label: status, color: 'bg-gray-500/20 text-gray-400' });

  const getPriorityConfig = (priority) => ({
    high: { label: 'HIGH', color: 'bg-red-500/20 text-red-400' },
    medium: { label: 'MEDIUM', color: 'bg-orange-500/20 text-orange-400' },
    low: { label: 'LOW', color: 'bg-gray-500/20 text-gray-400' }
  }[priority] || { label: priority, color: 'bg-gray-500/20 text-gray-400' });

  // === Filters ===
  const filteredTickets = tickets.filter(ticket => {
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;
    // if user is not admin, show only their tickets
    if (user && user.role !== 'admin') {
      if (!(ticket.requester === user.email || ticket.requester === user.username || ticket.assignee === user.name)) return false;
    }
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  // === Handlers ===
  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicketForm.title.trim() || !newTicketForm.description.trim()) return;

    const API = 'http://localhost:8082/api';
    const stored = localStorage.getItem('user');
    const user = stored ? JSON.parse(stored) : null;
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
      setSelectedTicket(created);
    }).catch(() => {
      // fallback to client-only create
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
    });
  };

  const handleSendReply = () => {
    if (!replyText.trim() && attachedFiles.length === 0) return;
    console.log('Sending:', { text: replyText, files: attachedFiles });
    setReplyText('');
    setAttachedFiles([]);
    conversationEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Conversation: show ticket description as initial message (no mock replies)
  const conversation = selectedTicket ? [
    { id: 1, author: selectedTicket.requester || selectedTicket.assignee || 'User', role: 'customer', time: selectedTicket.time || '', message: selectedTicket.description || '' }
  ] : [];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Support Tickets</h1>
          <p className={`text-sm ${textMuted} mt-1`}>
            {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''} • {selectedTicket ? 'Viewing details' : 'Select a ticket'}
          </p>
        </div>
        <button 
          onClick={() => setShowCreateTicket(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
        >
          {renderIcon('plus', 'w-4 h-4')}
          Create Ticket
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${textMuted}`}>
            {renderIcon('search', 'w-4 h-4')}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, ID, or description..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${isDark ? 'bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500' : 'bg-gray-50 border-gray-200 placeholder:text-gray-400'}`}
          />
        </div>

        <div className="flex gap-3">
          <FilterPill 
            label="Status" 
            value={statusFilter} 
            options={[
              { value: 'all', label: 'All' },
              { value: 'open', label: 'Open' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'resolved', label: 'Resolved' }
            ]} 
            onChange={setStatusFilter}
            isDark={isDark}
            renderIcon={renderIcon}
          />
          <FilterPill 
            label="Priority" 
            value={priorityFilter} 
            options={[
              { value: 'all', label: 'All' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' }
            ]} 
            onChange={setPriorityFilter}
            isDark={isDark}
            renderIcon={renderIcon}
          />
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Ticket List */}
        <div className="w-1/3 overflow-y-auto pr-2 space-y-3">
          {filteredTickets.map(ticket => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket} 
              isSelected={selectedTicket?.id === ticket.id}
              onClick={() => setSelectedTicket(ticket)}
              isDark={isDark}
              getStatusConfig={getStatusConfig}
              getPriorityConfig={getPriorityConfig}
              renderIcon={renderIcon}
            />
          ))}
        </div>

        {/* Ticket Detail */}
        <div className="w-2/3 flex flex-col min-h-0">
          {selectedTicket ? (
            <div className={`rounded-2xl border ${surface} flex flex-col h-full overflow-hidden`}>
              {/* Header */}
              <div className="p-5 border-b border-inherit">
                <div className="flex justify-between items-start">
                  <div className="max-w-[80%]">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className={`text-lg font-semibold ${textPrimary} truncate`}>{selectedTicket.title}</h2>
                    </div>
                    <p className={`text-sm ${textMuted}`}>{selectedTicket.id} • {selectedTicket.time}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusConfig(selectedTicket.status).color}`}>
                      {getStatusConfig(selectedTicket.status).label}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityConfig(selectedTicket.priority).color}`}>
                      {getPriorityConfig(selectedTicket.priority).label}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  <DetailTag icon="user" label={selectedTicket.assignee} isDark={isDark} renderIcon={renderIcon} />
                  <DetailTag icon="ticket" label={selectedTicket.category} isDark={isDark} renderIcon={renderIcon} />
                </div>
              </div>

              {/* Conversation */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="space-y-5">
                  {conversation.map(msg => (
                    <MessageBubble 
                      key={msg.id}
                      message={msg}
                      isDark={isDark}
                      textPrimary={textPrimary}
                      textSecondary={textSecondary}
                      renderIcon={renderIcon}
                    />
                  ))}
                  <div ref={conversationEndRef} />
                </div>
              </div>

              {/* Reply Area */}
              <div className={`p-4 border-t ${isDark ? 'border-slate-700/60 bg-slate-800/60' : 'border-gray-200 bg-gray-50'}`}>
                {attachedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {attachedFiles.map((file, i) => (
                      <FileTag key={i} file={file} onRemove={() => removeFile(i)} isDark={isDark} renderIcon={renderIcon} />
                    ))}
                  </div>
                )}

                <div
                  className={`flex items-center gap-2 p-3 rounded-xl transition-all ${
                    isDragging 
                      ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/30' 
                      : `${isDark ? 'bg-slate-700/40 border-slate-600/50' : 'bg-white border-gray-200'}`
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    multiple
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-1.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    title="Attach file"
                  >
                    {renderIcon('paperclip')}
                  </button>
                  <button 
                    className="p-1.5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    title="Insert emoji"
                  >
                    {renderIcon('emoji')}
                  </button>
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendReply()}
                    placeholder="Type a message..."
                    className={`flex-1 bg-transparent outline-none text-sm ${textPrimary} placeholder:${textMuted}`}
                  />
                  <button 
                    onClick={handleSendReply}
                    disabled={!replyText.trim() && attachedFiles.length === 0}
                    className={`p-1.5 rounded-lg transition-colors ${
                      replyText.trim() || attachedFiles.length > 0
                        ? 'text-indigo-600 hover:bg-indigo-100 dark:hover:bg-indigo-500/20'
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {renderIcon('send', 'w-4 h-4')}
                  </button>
                </div>
                {isDragging && (
                  <p className="text-center text-xs text-indigo-500 mt-2 font-medium">Drop to attach files</p>
                )}
              </div>
            </div>
          ) : (
            <div className={`flex flex-col items-center justify-center h-full rounded-2xl border ${surface} p-8 text-center`}>
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
                {renderIcon('message', 'w-6 h-6 text-indigo-500')}
              </div>
              <h3 className={`text-lg font-medium ${textPrimary} mb-1`}>No ticket selected</h3>
              <p className={`${textSecondary} max-w-md`}>
                Choose a ticket from the list to view its details, conversation history, and send replies.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateTicket && (
        <CreateTicketModal
          newTicketForm={newTicketForm}
          setNewTicketForm={setNewTicketForm}
          isDark={isDark}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
          handleCreateTicket={handleCreateTicket}
          setShowCreateTicket={setShowCreateTicket}
          renderIcon={renderIcon}
        />
      )}
    </div>
  );
};

// --- Subcomponents ---

const FilterPill = ({ label, value, options, onChange, isDark, renderIcon }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
            value === opt.value
              ? 'bg-indigo-600 text-white'
              : isDark 
                ? 'bg-slate-700 text-gray-300 hover:bg-slate-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};

const TicketCard = ({ ticket, isSelected, onClick, isDark, getStatusConfig, getPriorityConfig, renderIcon }) => {
  const bg = isSelected 
    ? (isDark ? 'bg-indigo-500/15 border-indigo-500/50' : 'bg-indigo-50/80 border-indigo-300')
    : (isDark ? 'bg-slate-800/60 hover:bg-slate-700/60 border-slate-700/50' : 'bg-white hover:bg-gray-50 border-gray-200');
  
  return (
    <div 
      className={`border rounded-xl p-4 cursor-pointer transition-all ${bg} hover:shadow-sm`}
      onClick={onClick}
    >
      {/* Top Row: ID, Status, Priority */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'}`}>
            {ticket.id}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusConfig(ticket.status).color}`}>
            {getStatusConfig(ticket.status).label}
          </span>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityConfig(ticket.priority).color}`}>
          {getPriorityConfig(ticket.priority).label}
        </span>
      </div>

      {/* Category */}
      <div className="text-xs font-medium mb-1 uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {ticket.category}
      </div>

      {/* Title */}
      <h3 className="font-bold text-sm mb-1 text-gray-900 dark:text-white line-clamp-1">
        {ticket.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
        {ticket.description}
      </p>

      {/* Footer: Assignee + Replies */}
      <div className="pt-2 border-t border-gray-200/30 dark:border-slate-700/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            {ticket.assignee.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">{ticket.assignee}</span>
            <div className="text-xs text-gray-500 dark:text-gray-400">• {ticket.time}</div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
          <span className="text-sm font-medium">{ticket.replies}</span>
          {renderIcon('message', 'w-3.5 h-3.5')}
        </div>
      </div>
    </div>
  );
};

const DetailTag = ({ icon, label, isDark, renderIcon }) => (
  <div className="flex items-center gap-1.5">
    {renderIcon(icon, 'w-3.5 h-3.5')}
    <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>{label}</span>
  </div>
);

const MessageBubble = ({ message, isDark, textPrimary, textSecondary, renderIcon }) => {
  const isAgent = message.role === 'agent';
  const bubbleBg = isAgent 
    ? (isDark ? 'bg-indigo-500/10' : 'bg-indigo-50')
    : (isDark ? 'bg-slate-700/40' : 'bg-gray-100');

  return (
    <div className={`flex ${isAgent ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`max-w-[85%] flex gap-3 ${isAgent ? 'flex-row-reverse' : ''}`}>
        <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-medium ${
          isAgent ? 'bg-indigo-500' : 'bg-cyan-500'
        }`}>
          {message.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2 mb-1">
            <span className={`font-medium text-sm ${textPrimary}`}>{message.author}</span>
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{message.time}</span>
          </div>
          <div className={`p-3.5 rounded-2xl ${bubbleBg} text-sm ${textSecondary}`}>
            {message.message}
          </div>
        </div>
      </div>
    </div>
  );
};

const FileTag = ({ file, onRemove, isDark, renderIcon }) => (
  <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs ${
    isDark ? 'bg-slate-700/60' : 'bg-gray-200'
  }`}>
    <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{file.name}</span>
    <button onClick={onRemove} className="text-red-500 hover:text-red-400">
      {renderIcon('x', 'w-3 h-3')}
    </button>
  </div>
);

const CreateTicketModal = ({ newTicketForm, setNewTicketForm, isDark, textPrimary, textSecondary, handleCreateTicket, setShowCreateTicket, renderIcon }) => (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
    <div className={`w-full max-w-2xl rounded-2xl ${isDark ? 'bg-slate-800 border border-slate-700/60' : 'bg-white border border-gray-200'} shadow-2xl`}>
      <div className="p-5 border-b border-inherit flex justify-between items-center">
        <h2 className={`text-lg font-semibold ${textPrimary}`}>Create New Support Ticket</h2>
        <button onClick={() => setShowCreateTicket(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          {renderIcon('x', 'w-5 h-5')}
        </button>
      </div>
      <form onSubmit={handleCreateTicket} className="p-5 space-y-4">
        <InputField label="Subject" value={newTicketForm.title} onChange={v => setNewTicketForm({...newTicketForm, title: v})} isDark={isDark} />
        <TextareaField label="Description" value={newTicketForm.description} onChange={v => setNewTicketForm({...newTicketForm, description: v})} isDark={isDark} />
        
        <div className="grid grid-cols-2 gap-4">
          <SelectField 
            label="Category" 
            value={newTicketForm.category}
            onChange={v => setNewTicketForm({...newTicketForm, category: v})}
            options={['TECHNICAL', 'BILLING', 'FEATURE REQUEST', 'BUG REPORT']}
            isDark={isDark}
          />
          <SelectField 
            label="Priority" 
            value={newTicketForm.priority}
            onChange={v => setNewTicketForm({...newTicketForm, priority: v})}
            options={['low', 'medium', 'high']}
            isDark={isDark}
          />
        </div>
        
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowCreateTicket(false)}
            className={`px-4 py-2.5 rounded-xl font-medium ${
              isDark ? 'text-gray-300 hover:bg-slate-700' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  </div>
);

const InputField = ({ label, value, onChange, isDark }) => (
  <div>
    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3.5 py-2.5 rounded-xl border ${
        isDark ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-white border-gray-300'
      } focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500`}
      required
    />
  </div>
);

const TextareaField = ({ label, value, onChange, isDark }) => (
  <div>
    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows="3"
      className={`w-full px-3.5 py-2.5 rounded-xl border ${
        isDark ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-white border-gray-300'
      } focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500`}
      required
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, isDark }) => (
  <div>
    <label className={`block text-sm font-medium mb-1.5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-3.5 py-2.5 rounded-xl border ${
        isDark ? 'bg-slate-700/50 border-slate-600 text-white' : 'bg-white border-gray-300'
      } focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500`}
    >
      {options.map(opt => (
        <option key={opt} value={opt}>{opt.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
      ))}
    </select>
  </div>
);

export default TicketSection;