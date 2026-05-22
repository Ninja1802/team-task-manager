const Task = require('../models/Task');
const Project = require('../models/Project');

// @route GET /api/tasks?project=id
const getTasks = async (req, res) => {
  try {
    const filter = {};
    if (req.query.project) filter.project = req.query.project;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;

    const tasks = await Task.find(filter)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email')
      .populate('project', 'name');

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route POST /api/tasks
const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, priority, dueDate, status } = req.body;

    if (!title || !project) {
      return res.status(400).json({ message: 'Title and project are required' });
    }

    const projectExists = await Project.findById(project);
    if (!projectExists) return res.status(404).json({ message: 'Project not found' });

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo: assignedTo || null,
      createdBy: req.user._id,
      priority: priority || 'Medium',
      dueDate,
      status: status || 'Todo'
    });

    await task.populate('assignedTo', 'name email');
    await task.populate('createdBy', 'name email');

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name email');

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route GET /api/tasks/dashboard
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get the projects this user has access to
    let projects;
    if (req.user.role === 'Admin') {
      projects = await Project.find({}, '_id');
    } else {
      projects = await Project.find({
        $or: [
          { owner: userId },
          { 'members.user': userId }
        ]
      }, '_id');
    }
    const projectIds = projects.map(p => p._id);

    // Find tasks belonging to those projects
    const myTasks = await Task.find({ project: { $in: projectIds } });
    const totalTasks = myTasks.length;
    const doneTasks = myTasks.filter(t => t.status === 'Done').length;
    const inProgressTasks = myTasks.filter(t => t.status === 'In Progress').length;
    const overdueTasks = myTasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Done').length;

    const recentTasks = await Task.find({ project: { $in: projectIds } })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate('project', 'name');

    res.json({ totalTasks, doneTasks, inProgressTasks, overdueTasks, recentTasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getDashboardStats };
