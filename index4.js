const express = require('express')
const app = express();

//Middle to parse JSON requests
app.use(express.json());

//array to store data
let tasks = [];

//Create a new task (POST)
app.post('/tasks', (req, res) => {
    const { name } = req.body;

    if(!name){
        return res.status(400).json({message: "Task name is required"});
    }

    const newTask = {
        id: tasks.length + 1,
        name,
        completed: false
    }

    tasks.push(newTask);
    res.status(201).json(newTask);
});

//Get all tasks (GET)
app.get('/tasks', (req, res) => {
    res.status(201).json(tasks);
})

//Get a single task by ID (GET)
app.get('/tasks/:id', (req, res) => {
    const task =tasks.find(t => t.id === parseInt(req.params.id));

    if(!task){
        return res.status(404).json({ message: 'Task not found'});
    }

    res.json(task);
})

//Update a task (PUT)
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));

    if(!task){
        return res.status(404).json({ message: 'Task not found'});
    }

    const { name, completed } = req.body;

    if (name) task.name = name;
    if (completed) task.completed = completed;

    res.json(task);
})

//Delete a task (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.find(t => t.id === parseInt(req.params.id));

    if(!taskIndex){
        return res.status(404).json({ message: 'Task not found'});
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})
