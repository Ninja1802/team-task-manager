import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, UserPlus, ArrowLeft } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { getInitials, formatDate } from '../utils/helpers';
import TaskCard from '../components/TaskCard';
import toast from 'react-hot-toast';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', assignedTo: '', priority: 'Medium', dueDate: '', status: 'Todo' });
  const [memberEmail, setMemberEmail] = useState('');

  const fetchData = async () => {
    try {
      const [projRes, taskRes, usersRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/tasks?project=${id}`),
        api.get('/users')
      ]);
      setProject(projRes.data);
      setTasks(taskRes.data);
      setUsers(usersRes.data);
    } catch (err) {
      toast.error('Failed to load project');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [id]);

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTask) {
        await api.put(`/tasks/${editTask._id}`, taskForm);
        toast.success('Task updated!');
      } else {
        await api.post('/tasks', { ...taskForm, project: id });
        toast.success('Task created!');
      }
      setShowTaskModal(false);
      setEditTask(null);
      setTaskForm({ title: '', description: '', assignedTo: '', priority: 'Medium', dueDate: '', status: 'Todo' });
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('Task deleted');
      fetchData();
    } catch (err) {
      toast.error('Failed to delete');
    }
  };

  const handleStatusChange = async (taskId, status) => {
    try {
      await api.put(`/tasks/${taskId}`, { status });
      fetchData();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const openEditTask = (task) => {
    setEditTask(task);
    setTaskForm({
      title: task.title,
      description: task.description || '',
      assignedTo: task.assignedTo?._id || '',
      priority: task.priority,
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
      status: task.status
    });
    setShowTaskModal(true);
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/projects/${id}/members`, { email: memberEmail });
      toast.success('Member added!');
      setShowMemberModal(false);
      setMemberEmail('');
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add member');
    }
  };

  if (loading) return <div className="loading">Loading project...</div>;
  if (!project) return null;

  const todoTasks = tasks.filter(t => t.status === 'Todo');
  const progressTasks = tasks.filter(t => t.status === 'In Progress');
  const doneTasks = tasks.filter(t => t.status === 'Done');

  return (
    <div>
      <div className="page-header">
        <div>
          <button className="back-btn" onClick={() => navigate('/projects')}>
            <ArrowLeft size={16} /> Projects
          </button>
          <h2 className="page-title">{project.name}</h2>
          {project.description && <p className="page-subtitle">{project.description}</p>}
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-outline" onClick={() => setShowMemberModal(true)}>
            <UserPlus size={16} /> Add Member
          </button>
          <button className="btn btn-primary" onClick={() => { setEditTask(null); setTaskForm({ title: '', description: '', assignedTo: '', priority: 'Medium', dueDate: '', status: 'Todo' }); setShowTaskModal(true); }}>
            <Plus size={16} /> Add Task
          </button>
        </div>
      </div>

      {/* Members */}
      <div className="members-bar">
        <span className="members-label">Members:</span>
        {project.members?.map(m => (
          <div key={m.user?._id} className="member-chip" title={m.user?.name}>
            <div className="mini-avatar-sm">{getInitials(m.user?.name)}</div>
            <span>{m.user?.name}</span>
            <span className={`badge ${m.role === 'Admin' ? 'badge-admin' : 'badge-member'}`}>{m.role}</span>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      <div className="kanban-board">
        {[
          { title: 'To Do', tasks: todoTasks, color: '#f43f5e', glowClass: 'glow-red' },
          { title: 'In Progress', tasks: progressTasks, color: '#f59e0b', glowClass: 'glow-yellow' },
          { title: 'Done', tasks: doneTasks, color: '#10b981', glowClass: 'glow-green' }
        ].map(col => (
          <div key={col.title} className={`kanban-col ${col.glowClass}`}>
            <div className="kanban-col-header">
              <span className="kanban-col-dot" style={{ background: col.color, color: col.color }}></span>
              <h3>{col.title}</h3>
              <span className="kanban-count">{col.tasks.length}</span>
            </div>
            <div className="kanban-tasks">
              {col.tasks.map(task => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onEdit={openEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
              {col.tasks.length === 0 && <div className="kanban-empty">No tasks</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editTask ? 'Edit Task' : 'New Task'}</h2>
              <button className="close-btn" onClick={() => setShowTaskModal(false)}>×</button>
            </div>
            <form onSubmit={handleTaskSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} placeholder="Task title" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows={2} value={taskForm.description} onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} placeholder="Details..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label>Assign To</label>
                  <select value={taskForm.assignedTo} onChange={e => setTaskForm({ ...taskForm, assignedTo: e.target.value })}>
                    <option value="">Unassigned</option>
                    {users.map(u => <option key={u._id} value={u._id}>{u.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select value={taskForm.priority} onChange={e => setTaskForm({ ...taskForm, priority: e.target.value })}>
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select value={taskForm.status} onChange={e => setTaskForm({ ...taskForm, status: e.target.value })}>
                    <option>Todo</option><option>In Progress</option><option>Done</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Due Date</label>
                  <input type="date" value={taskForm.dueDate} onChange={e => setTaskForm({ ...taskForm, dueDate: e.target.value })} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowTaskModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editTask ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Member Modal */}
      {showMemberModal && (
        <div className="modal-overlay" onClick={() => setShowMemberModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Member</h2>
              <button className="close-btn" onClick={() => setShowMemberModal(false)}>×</button>
            </div>
            <form onSubmit={handleAddMember}>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={memberEmail} onChange={e => setMemberEmail(e.target.value)} placeholder="member@email.com" required />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowMemberModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
