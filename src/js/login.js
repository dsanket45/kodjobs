document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, password })
        });

        const data = await response.json();
        
        if (response.ok) {
            // Store user info in sessionStorage
            sessionStorage.setItem('currentUser', JSON.stringify(data.user));
            
            // Redirect to dashboard
            window.location.href = 'jobdashboard.html';
        } else {
            alert(data.error || 'Invalid credentials. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
    }
});