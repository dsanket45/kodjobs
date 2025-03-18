const fs = require('fs').promises;
const path = require('path');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const newUser = req.body;
        const usersFilePath = path.join(process.cwd(), 'src', 'users.json');
        
        // Read current users
        let users;
        try {
            const data = await fs.readFile(usersFilePath, 'utf8');
            users = JSON.parse(data);
        } catch {
            users = { users: [] };
        }

        // Check if email exists
        if (users.users.some(user => user.email === newUser.email)) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Add new user
        newUser.id = users.users.length + 1;
        users.users.push(newUser);

        // Save updated users
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
}; 