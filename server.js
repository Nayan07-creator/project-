const express = require('express');
const app = express();
app.use(express.json());

// Middleware (Logging)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

let users = [];

// GET
app.get('/users', (req, res) => {
    res.json(users);
});

// POST (Validation included)
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send("Invalid data");
    }
    users.push({ id: users.length + 1, name, email });
    res.send("User added");
});

// PUT
app.put('/users/:id', (req, res) => {
    const user = users.find(u => u.id == req.params.id);
    if (!user) return res.status(404).send("User not found");

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    res.send("User updated");
});

// DELETE
app.delete('/users/:id', (req, res) => {
    users = users.filter(u => u.id != req.params.id);
    res.send("User deleted");
});

app.listen(3000, () => console.log("Server running on port 3000"));
