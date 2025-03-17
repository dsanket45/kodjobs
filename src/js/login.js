document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;

        try {
            // Get users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '[]');

            // Find user
            const user = users.find(u => u.name === name && u.password === password);

            if (user) {
                // Store user session
                sessionStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                }));

                // Redirect to dashboard
                window.location.href = 'jobdashboard.html';
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    });
});