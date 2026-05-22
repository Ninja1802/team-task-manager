import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, AlertTriangle, ListTodo, TrendingUp } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { formatDate, getStatusBadgeClass } from '../utils/helpers';
import './Dashboard.css';

const statCards = [
  {
    key: 'totalTasks',
    label: 'Total Tasks',
    icon: <ListTodo size={22} color="white" />,
    gradient: 'linear-gradient(135deg, #6366f1, #4338ca)',
    glow: 'rgba(99, 102, 241, 0.5)',
  },
  {
    key: 'inProgressTasks',
    label: 'In Progress',
    icon: <Clock size={22} color="white" />,
    gradient: 'linear-gradient(135deg, #22d3ee, #0891b2)',
    glow: 'rgba(34, 211, 238, 0.5)',
  },
  {
    key: 'doneTasks',
    label: 'Completed',
    icon: <CheckCircle size={22} color="white" />,
    gradient: 'linear-gradient(135deg, #34d399, #059669)',
    glow: 'rgba(52, 211, 153, 0.5)',
  },
  {
    key: 'overdueTasks',
    label: 'Overdue',
    icon: <AlertTriangle size={22} color="white" />,
    gradient: 'linear-gradient(135deg, #f87171, #dc2626)',
    glow: 'rgba(248, 113, 113, 0.5)',
  },
];

const StatCard = ({ icon, label, value, gradient, glow }) => (
  <div className="stat-card">
    <div
      className="stat-icon"
      style={{
        background: gradient,
        boxShadow: `0 0 20px ${glow}`,
      }}
    >
      {icon}
    </div>
    <div className="stat-info">
      <p className="stat-value">{value ?? 0}</p>
      <p className="stat-label">{label}</p>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/tasks/dashboard');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  if (loading) return <div className="loading">Loading your dashboard...</div>;

  return (
    <div>
      <div className="page-header">
        <div className="dashboard-welcome">
          <h2 className="page-title">{greeting}, {user?.name?.split(' ')[0]}! 👋</h2>
          <p className="page-subtitle">Here's your task overview for today</p>
        </div>
      </div>

      <div className="stats-grid">
        {statCards.map(card => (
          <StatCard
            key={card.key}
            icon={card.icon}
            label={card.label}
            value={stats?.[card.key]}
            gradient={card.gradient}
            glow={card.glow}
          />
        ))}
      </div>

      <div className="dashboard-section">
        <h3 className="section-title">
          <TrendingUp size={18} color="var(--primary)" />
          Recent Tasks
        </h3>
        {!stats?.recentTasks?.length ? (
          <div className="empty-state">
            <CheckCircle size={40} color="var(--text-muted)" />
            <p>No tasks assigned yet. Get started by creating a project!</p>
          </div>
        ) : (
          <div className="recent-tasks-list">
            {stats.recentTasks.map(task => (
              <div key={task._id} className="recent-task-item">
                <div className="recent-task-info">
                  <p className="recent-task-title">{task.title}</p>
                  {task.project?.name && (
                    <span className="recent-task-project">{task.project.name}</span>
                  )}
                </div>
                <div className="recent-task-right">
                  <span className={getStatusBadgeClass(task.status)}>{task.status}</span>
                  {task.dueDate && (
                    <span className="recent-task-date">{formatDate(task.dueDate)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
