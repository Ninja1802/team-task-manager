import React from 'react';
import { Calendar, User, Edit2, Trash2 } from 'lucide-react';
import { formatDate, isOverdue, getStatusBadgeClass, getPriorityBadgeClass, getInitials } from '../utils/helpers';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const overdue = isOverdue(task.dueDate, task.status);
  const priorityClass = task.priority?.toLowerCase() || 'medium';

  return (
    <div className={`task-card priority-${priorityClass}`}>
      {/* Header: title + priority badge */}
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <span className={`task-priority ${getPriorityBadgeClass(task.priority)}`}>
          {task.priority}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      {/* Meta: assignee + due date */}
      <div className="task-meta">
        {task.assignedTo && (
          <div className="task-assignee">
            <div className="task-assignee-avatar">
              {getInitials(task.assignedTo.name)}
            </div>
            <span>{task.assignedTo.name}</span>
          </div>
        )}
        {task.dueDate && (
          <div className={`task-meta-item ${overdue ? 'overdue' : ''}`}>
            <Calendar size={12} />
            <span>{formatDate(task.dueDate)}{overdue ? ' ⚠' : ''}</span>
          </div>
        )}
      </div>

      {/* Project tag + status */}
      <div className="task-status-row">
        {task.project?.name && (
          <span className="task-project-tag">{task.project.name}</span>
        )}
        <select
          className="task-status-select"
          value={task.status}
          onChange={e => onStatusChange && onStatusChange(task._id, e.target.value)}
        >
          <option>Todo</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>

      {/* Actions */}
      <div className="task-actions">
        {onEdit && (
          <button className="btn btn-outline btn-sm" onClick={() => onEdit(task)}>
            <Edit2 size={12} /> Edit
          </button>
        )}
        {onDelete && (
          <button className="btn btn-danger btn-sm" onClick={() => onDelete(task._id)}>
            <Trash2 size={12} /> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
