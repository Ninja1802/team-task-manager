export const formatDate = (dateStr) => {
  if (!dateStr) return 'No date';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
};

export const isOverdue = (dueDate, status) => {
  if (!dueDate || status === 'Done') return false;
  return new Date(dueDate) < new Date();
};

export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Todo': return 'badge badge-todo';
    case 'In Progress': return 'badge badge-progress';
    case 'Done': return 'badge badge-done';
    default: return 'badge badge-todo';
  }
};

export const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case 'Low': return 'badge badge-low';
    case 'Medium': return 'badge badge-medium';
    case 'High': return 'badge badge-high';
    default: return 'badge badge-medium';
  }
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};
