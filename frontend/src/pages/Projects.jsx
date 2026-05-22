import React, { useState, useEffect } from 'react';
import { Plus, Folder, Users, Calendar, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/helpers';
import toast from 'react-hot-toast';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', deadline: '' });
  const { user } = useAuth();

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', form);
      toast.success('Project created!');
      setShowModal(false);
      setForm({ name: '', description: '', deadline: '' });
      fetchProjects();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create project');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      toast.success('Project deleted');
      fetchProjects();
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  const getStatusClass = (status) => {
    if (status === 'Active') return 'badge badge-active';
    if (status === 'Completed') return 'badge badge-done';
    return 'badge badge-inactive';
  };

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Projects</h2>
          <p className="page-subtitle">
            {projects.length} project{projects.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={16} /> New Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-projects">
          <Sparkles size={48} color="var(--primary)" style={{ opacity: 0.5 }} />
          <p>No projects yet. Create your first one!</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} /> Create Project
          </button>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project._id} className={`project-card ${project.status === 'Completed' ? 'glow-green' : project.status === 'Active' ? 'glow-yellow' : 'glow-red'}`}>
              <div className="project-card-header">
                <div className="project-icon">
                  <Folder size={20} color="white" />
                </div>
                <span className={getStatusClass(project.status)}>
                  {project.status}
                </span>
              </div>
              <div className="project-body">
                <h3 className="project-name">{project.name}</h3>
                {project.description && (
                  <p className="project-desc">{project.description}</p>
                )}
                <div className="project-meta">
                  <div className="project-meta-item">
                    <Users size={13} />
                    <span>{project.members?.length || 0} members</span>
                  </div>
                  {project.deadline && (
                    <div className="project-meta-item">
                      <Calendar size={13} />
                      <span>{formatDate(project.deadline)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="project-footer">
                <span className="project-owner">by {project.owner?.name}</span>
                <div className="project-actions">
                  <Link to={`/projects/${project._id}`} className="btn btn-outline btn-sm">
                    View
                  </Link>
                  {(user?.role === 'Admin' || project.owner?._id === user?._id) && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>New Project</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Project Name *</label>
                <input
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="My Awesome Project"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Brief description..."
                />
              </div>
              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={e => setForm({ ...form, deadline: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Plus size={16} /> Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
