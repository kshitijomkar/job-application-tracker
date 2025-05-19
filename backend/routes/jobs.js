const express = require('express');
const router = express.Router();
const Job = require('../models/job');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Middleware to protect routes
function authMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');
  console.log('Token received:', authHeader); // <-- DEBUG LINE

  if (!authHeader) return res.status(401).json({ message: 'Access Denied. No token provided.' });

  try {
    // Remove 'Bearer ' prefix if it exists
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains userId
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

// 📌 Create a new job application
router.post('/', authMiddleware, async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      userId: req.user.userId // use userId from token payload
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error creating job', error });
  }
});

// 📌 Get all jobs for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.userId });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

// 📌 Update a job
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );
    if (!job) return res.status(404).json({ message: 'Job not found or not authorized' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
});

// 📌 Delete a job
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!job) return res.status(404).json({ message: 'Job not found or not authorized' });
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
});

module.exports = router;
