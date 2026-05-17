// routes/tasks.js
// ************ // This type of comments use as a legend to show lines added for MongoDB instead of in-memory data store. 
var express = require('express');
var router = express.Router();
const Task = require('../models/Task'); // ************ //

// Temporary in-memory data store (replaced by MongoDB in LU3)
// let tasks = [
//     { id: 1, title: 'Learn Express', done: false },
//     { id: 2, title: 'Build a REST API', done: false }
// ];
// let nextId = 3;

// GET /api/tasks - list all
/// router.get('/', function (req, res) {
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/tasks/:id - fetch one
router.get('/:id', async (req, res) => {
    try {
        //const id = Number(req.params.id);
        const id = req.params.id;

        /// const task = tasks.find(t => t.id === id);
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ error: 'Task not found' });
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message + " (invalid task ID)" });
    }
});

// POST /api/tasks - create
/// router.post('/', function (req, res) {
router.post('/', async (req, res) => {
    try {
        const task = await Task.create({ title: req.body.title });
        res.status(201).json(task);

        // const { title } = req.body;
        // if (!title || title.trim().length === 0) {
        //     return res.status(400).json({ error: 'title is required' });
        // }
        // const newTask = { id: nextId++, title: title.trim(), done: false };
        // tasks.push(newTask);
        // res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT /api/tasks/:id - update
// router.put('/:id', function (req, res) {
router.put('/:id', async (req, res) => {
    try{
    //const id = Number(req.params.id);
    const id = req.params.id;

    const task = await Task.findByIdAndUpdate(id, req.body, 
        { new: true, runValidators: true });

    // const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    
    // if (req.body.title !== undefined) task.title = req.body.title;
    // if (req.body.done !== undefined) task.done = req.body.done;
    res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message + " (invalid task ID or data)" });
    }
});

// DELETE /api/tasks/:id - delete
// router.delete('/:id', function (req, res) {
router.delete('/:id', async (req, res) => {
    console.time('delete'); // console.time(label) and console.timeEnd(label) measure execution time of code blocks within the label start and end.
    try{
    // const id = Number(req.params.id);
    const id = req.params.id;
    // const index = tasks.findIndex(t => t.id === id);
    // if (index === -1) return res.status(404).json({ error: 'Task not found' });
    // const removed = tasks.splice(index, 1)[0];
    // res.json(removed);
    const task = await Task.findByIdAndDelete(req.params.id);
    console.timeEnd('delete');
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message + 'Invalid id'});
    }   
});
module.exports = router;