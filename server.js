const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('src'));

// Sample jobs data
const sampleJobs = [
    {
        id: 1,
        title: "Software Engineer",
        company: { display_name: "Tech Corp" },
        location: { display_name: "New York, NY" },
        description: "Looking for a skilled software engineer with experience in web development.",
        redirect_url: "#"
    },
    {
        id: 2,
        title: "Frontend Developer",
        company: { display_name: "Web Solutions" },
        location: { display_name: "San Francisco, CA" },
        description: "Frontend developer position with focus on React and modern JavaScript.",
        redirect_url: "#"
    },
    {
        id: 3,
        title: "Backend Developer",
        company: { display_name: "Data Systems" },
        location: { display_name: "Austin, TX" },
        description: "Backend developer role working with Node.js and databases.",
        redirect_url: "#"
    }
];

// Read users from JSON file
function readUsers() {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'src', 'users.json'), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { users: [] };
    }
}

// Write users to JSON file
function writeUsers(data) {
    fs.writeFileSync(path.join(__dirname, 'src', 'users.json'), JSON.stringify(data, null, 4));
}

// Get all users
app.get('/api/users', (req, res) => {
    const data = readUsers();
    res.json(data);
});

// Get jobs
app.get('/api/jobs', (req, res) => {
    res.json({ results: sampleJobs });
});

// Register new user
app.post('/api/register', (req, res) => {
    const data = readUsers();
    const { name, email, password, dob, age } = req.body;

    // Check if email already exists
    if (data.users.some(user => user.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }

    // Create new user
    const newUser = {
        id: data.users.length + 1,
        name,
        email,
        password,
        dob,
        age
    };

    // Add user to array
    data.users.push(newUser);

    // Save to file
    writeUsers(data);

    res.json({ message: 'Registration successful', user: newUser });
});

// Login user
app.post('/api/login', (req, res) => {
    const data = readUsers();
    const { name, password } = req.body;

    const user = data.users.find(u => u.name === name && u.password === password);

    if (user) {
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 