document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    
    // Calculate age
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    try {
        const response = await fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password,
                dob,
                age
            })
        });

        const data = await response.json();
        
        if (response.ok) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert(data.error || 'Registration failed. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    }
});