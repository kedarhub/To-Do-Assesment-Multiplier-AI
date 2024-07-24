const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// To-Do model
const Todo = mongoose.model('Todo', new mongoose.Schema({
    text: { type: String, required: true }
}));

// API Endpoints

//Fetch all to-do items
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// To Add a new to-do item
app.post('/todos', async (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });
    await todo.save();
    res.json(todo);
});

// To Delete a to-do item by ID
app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'To-do item deleted' });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
