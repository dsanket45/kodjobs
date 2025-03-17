document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        
        // Calculate age from DOB
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        try {
            // Get existing users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Check if email already exists
            if (users.some(user => user.email === email)) {
                alert('Email already registered');
                return;
            }

            // Create new user
            const newUser = {
                id: users.length + 1,
                name,
                email,
                password,
                dob,
                age
            };

            // Add user to array
            users.push(newUser);

            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(users));

            // Show success message
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    });
});