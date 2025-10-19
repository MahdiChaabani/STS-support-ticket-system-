import React, { useState } from 'react';

const SupportTicketSystem = () => {
  const [theme, setTheme] = useState('dark');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const stats = [
    { title: 'TOTAL TICKETS', value: 24, trend: 'up', trendValue: '12% from last week', color: 'from-indigo-500 to-purple-600', icon: 'clipboard' },
    { title: 'OPEN TICKETS', value: 8, trend: 'up', trendValue: '4 new today', color: 'from-cyan-500 to-blue-600', icon: 'clock' },
    { title: 'IN PROGRESS', value: 6, trend: 'down', trendValue: '8% from last week', color: 'from-orange-500 to-red-500', icon: 'zap' },
    { title: 'RESOLVED', value: 10, trend: 'up', trendValue: '22% from last week', color: 'from-emerald-500 to-green-600', icon: 'check' }
  ];

  const tickets = [
    {
      id: 'TK-1042',
      category: 'TECHNICAL',
      title: 'Login Authentication Issue',
      description: 'Unable to authenticate using OAuth provider. Getting continuous redirect errors on the login page.',
      status: 'in-progress',
      priority: 'high',
      time: '2 hours ago',
      replies: 3,
      assignee: 'Vasso Bert'
    },
    {
      id: 'TK-1041',
      category: 'BILLING',
      title: 'Payment Method Update',
      description: 'Need assistance updating payment method for subscription renewal. Current card has expired.',
      status: 'open',
      priority: 'medium',
      time: '5 hours ago',
      replies: 1,
      assignee: 'Mohamed Ali'
    },
    {
      id: 'TK-1038',
      category: 'FEATURE REQUEST',
      title: 'Dark Mode for Mobile App',
      description: 'Request to implement dark mode theme option in the mobile application for better user experience.',
      status: 'in-progress',
      priority: 'low',
      time: '1 day ago',
      replies: 5,
      assignee: 'Donald Akeem'
    },
    {
      id: 'TK-1035',
      category: 'BUG REPORT',
      title: 'Dashboard Data Not Loading',
      description: 'Dashboard analytics widgets are showing empty state even though data exists in the system.',
      status: 'resolved',
      priority: 'high',
      time: '3 days ago',
      replies: 8,
      assignee: 'Mahdi Chaabani'
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      'open': 'bg-cyan-500',
      'in-progress': 'bg-blue-500',
      'resolved': 'bg-emerald-500'
    };
    return badges[status] || '';
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      'high': 'bg-red-500',
      'medium': 'bg-orange-500',
      'low': 'bg-gray-500'
    };
    return badges[priority] || '';
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const renderIcon = (iconType, className = "w-6 h-6") => {
    const icons = {
      clipboard: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      clock: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      zap: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      check: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      dashboard: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
        </svg>
      ),
      ticket: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
        </svg>
      ),
      user: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      message: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      document: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      bell: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      mail: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      search: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      plus: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
      trending: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      trendingDown: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      ),
      logout: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      )
    };
    return icons[iconType] || null;
  };

  const filteredTickets = tickets.filter(ticket => {
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;
    if (priorityFilter !== 'all' && ticket.priority !== priorityFilter) return false;
    return true;
  });

  return (
    <div className={`flex h-screen overflow-hidden transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-slate-950' 
        : 'bg-slate-50'
    }`}>
      {/* Sidebar */}
      <div className={`w-72 border-r transition-colors duration-200 flex flex-col ${
        theme === 'dark'
          ? 'bg-slate-950 border-slate-800'
          : 'bg-white border-slate-200'
      }`}>
        <div className="p-6 border-b border-inherit">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              {renderIcon('zap', 'w-7 h-7 text-white')}
            </div>
            <div>
              <h2 className={`text-base font-bold tracking-tight leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>STS - Support Ticket System</h2>
              <p className={`text-xs font-semibold uppercase tracking-wider mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="mb-8">
            <p className={`text-xs font-semibold uppercase tracking-wider mb-4 px-4 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Main</p>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
              { id: 'tickets', label: 'Tickets', badge: '4', icon: 'ticket' },
              { id: 'profile', label: 'Profile', icon: 'user' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 mb-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeNav === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30 dot-indicator'
                    : theme === 'dark' 
                      ? 'text-slate-400 hover:text-slate-300' 
                      : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {renderIcon(item.icon, 'w-5 h-5 flex-shrink-0')}
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    activeNav === item.id 
                      ? 'bg-white/20 text-white' 
                      : theme === 'dark' 
                        ? 'bg-slate-800 text-slate-400' 
                        : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {activeNav === item.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div>
            <p className={`text-xs font-semibold uppercase tracking-wider mb-4 px-4 ${theme === 'dark' ? 'text-slate-600' : 'text-slate-400'}`}>Support</p>
            {[
              { id: 'messages', label: 'Messages', icon: 'message' },
              { id: 'docs', label: 'Documentation', icon: 'document' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 mb-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeNav === item.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30'
                    : theme === 'dark' 
                      ? 'text-slate-400 hover:text-slate-300' 
                      : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {renderIcon(item.icon, 'w-5 h-5 flex-shrink-0')}
                <span>{item.label}</span>
                {activeNav === item.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Theme Toggle */}
        <div className={`border-t p-4 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-200'}`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
              theme === 'dark'
                ? 'text-slate-400'
                : 'text-slate-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{theme === 'dark' ? '🌙' : '☀️'}</span>
              <span>Theme</span>
            </div>
            <div className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
              theme === 'dark'
                ? 'bg-slate-700'
                : 'bg-slate-300'
            }`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${
                theme === 'dark'
                  ? 'left-0.5'
                  : 'left-6'
              }`} />
            </div>
          </button>

          {/* User Profile */}
          <div className={`mt-4 p-4 rounded-lg border ${
            theme === 'dark'
              ? 'bg-slate-800/50 border-slate-700'
              : 'bg-slate-100/50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                MC
              </div>
              <div className="min-w-0">
                <h4 className={`text-sm font-bold truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Mahdi C.</h4>
                <p className={`text-xs truncate ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>admin@sts.com</p>
              </div>
            </div>
            <button className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg border font-medium text-sm transition-all duration-200 ${
              theme === 'dark'
                ? 'border-slate-700 text-slate-300 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400'
                : 'border-slate-300 text-slate-600 hover:bg-red-100/50 hover:border-red-300 hover:text-red-600'
            }`}>
              {renderIcon('logout', 'w-4 h-4')}
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className={`border-b px-8 py-4 flex items-center justify-between transition-colors duration-200 ${
          theme === 'dark'
            ? 'bg-slate-900 border-slate-800'
            : 'bg-white border-slate-200'
        }`}>
          <div className="relative flex-1 max-w-lg">
            <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
              {renderIcon('search', 'w-5 h-5')}
            </div>
            <input
              type="text"
              placeholder="Search tickets..."
              className={`w-full pl-10 pr-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 ${
                theme === 'dark'
                  ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-purple-500/20 focus:border-purple-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-purple-500/20 focus:border-purple-500'
              }`}
            />
          </div>
          
          <div className="flex items-center gap-3 ml-6">
            <button className={`relative w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-200 hover:bg-opacity-80 ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}>
              {renderIcon('bell', 'w-5 h-5')}
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">3</span>
            </button>
            <button className={`relative w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-200 hover:bg-opacity-80 ${
              theme === 'dark'
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}>
              {renderIcon('mail', 'w-5 h-5')}
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">7</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Dashboard
              </h1>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Welcome back, Mahdi 👋
              </p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
              {renderIcon('plus', 'w-5 h-5')}
              Create Ticket
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`border rounded-xl p-6 transition-all duration-200 cursor-pointer group ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700 hover:from-slate-800 hover:to-slate-800/80 hover:border-purple-600/50 hover:shadow-lg'
                    : 'bg-gradient-to-br from-slate-50/80 to-white border-slate-200 hover:from-white hover:to-slate-100 hover:border-purple-400/50 hover:shadow-lg'
                }`}
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4 shadow-md`}>
                  {renderIcon(stat.icon, 'w-6 h-6 text-white')}
                </div>
                <h3 className={`text-xs font-semibold uppercase tracking-widest mb-3 ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                  {stat.title}
                </h3>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    {stat.value}
                  </span>
                </div>
                <div className={`flex items-center gap-2 p-2 rounded-lg w-fit ${
                  theme === 'dark' 
                    ? 'bg-slate-700/30' 
                    : 'bg-slate-100/50'
                }`}>
                  {stat.trend === 'up' ? (
                    renderIcon('trending', 'w-4 h-4 text-emerald-500')
                  ) : (
                    renderIcon('trendingDown', 'w-4 h-4 text-red-500')
                  )}
                  <span className={`text-xs font-semibold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                    {stat.trendValue}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Tickets Section */}
          <div className={`border rounded-xl transition-colors duration-200 ${
            theme === 'dark'
              ? 'bg-slate-800/50 border-slate-700'
              : 'bg-white border-slate-200'
          }`}>
            <div className="p-6 border-b border-inherit">
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Recent Tickets
                </h2>
              </div>
              
              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>

                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    theme === 'dark'
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="all">All Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            {/* Tickets List */}
            <div className={`divide-y ${theme === 'dark' ? 'divide-slate-700' : 'divide-slate-200'}`}>
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-6 transition-all duration-200 cursor-pointer group border-l-4 ${
                    ticket.priority === 'high' ? 'border-l-red-500' :
                    ticket.priority === 'medium' ? 'border-l-orange-500' :
                    'border-l-slate-400'
                  } ${
                    theme === 'dark'
                      ? 'hover:bg-slate-800/40'
                      : 'hover:bg-slate-100/60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {ticket.id}
                        </span>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-semibold shadow-sm ${
                          ticket.category === 'TECHNICAL' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' :
                          ticket.category === 'BILLING' ? 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400' :
                          ticket.category === 'FEATURE REQUEST' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400' :
                          'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                        }`}>
                          {ticket.category}
                        </span>
                      </div>
                      <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? 'text-slate-100' : 'text-slate-800'}`}>
                        {ticket.title}
                      </h3>
                      <p className={`text-sm line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                        {ticket.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                      <div className="text-right">
                        <div className="flex gap-2 mb-2 justify-end">
                          <span className={`text-xs px-3 py-1 rounded-full font-bold text-white ${getStatusBadge(ticket.status)}`}>
                            {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('-', ' ')}
                          </span>
                          <span className={`text-xs px-3 py-1 rounded-full font-bold text-white ${getPriorityBadge(ticket.priority)}`}>
                            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                          </span>
                        </div>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                          {ticket.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-inherit">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        Assigned to: <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}>{ticket.assignee}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderIcon('message', 'w-4 h-4 text-slate-400')}
                      <span className={`text-xs font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                        {ticket.replies} replies
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicketSystem;