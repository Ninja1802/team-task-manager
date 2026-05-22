import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/helpers';
import toast from 'react-hot-toast';
import './Team.css';

const Team = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to load team');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (userId, role) => {
    try {
      await api.put(`/users/${userId}/role`, { role });
      toast.success('Role updated!');
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  if (loading) return <div className="loading">Loading team...</div>;

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Team</h2>
          <p className="page-subtitle">{users.length} members</p>
        </div>
      </div>

      <div className="team-grid">
        {users.map(u => (
          <div key={u._id} className={`team-card ${u.role === 'Admin' ? 'glow-green' : 'glow-yellow'}`}>
            <div className="team-avatar">{getInitials(u.name)}</div>
            <div className="team-info">
              <h3 className="team-name">{u.name} {u._id === user?._id && <span className="you-tag">You</span>}</h3>
              <p className="team-email">{u.email}</p>
            </div>
            <div className="team-role">
              {user?.role === 'Admin' && u._id !== user?._id ? (
                <select
                  value={u.role}
                  onChange={e => handleRoleChange(u._id, e.target.value)}
                  className="role-select"
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                </select>
              ) : (
                <span className={`badge ${u.role === 'Admin' ? 'badge-admin' : 'badge-member'}`}>{u.role}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
