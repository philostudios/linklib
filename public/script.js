// This module handles user authentication process and interacts with backend API to verify credentials, store user data securely

// Registration form
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Clear previous error message
    errorMessage.textContent = '';

    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();

    if (response.ok) {
        // Successful registration
        console.log(`Successful registration, Username: ${username}`);
        localStorage.setItem('userId', result.userId);
        window.location.href = 'links.html'; // Redirect to links library
    } else {
        // Unsuccessful registration
        errorMessage.textContent = 'Invalid password or username already exists';
        console.log('Unsuccessful registration');
    }
});

// Login form
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorMessage = document.getElementById('error-message');
    
  console.log("Username:", username); // Log username
    console.log("Password:", password); // Log password
  
    // Clear previous error message
    errorMessage.textContent = '';
  
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
  
    if (response.ok) {
        // Successful login
        localStorage.setItem('userId', result.user.id);
        console.log(`Successful login`);
        window.location.href = 'links.html'; // Redirect to links library
    } else {
        // Unsuccessful registration
        errorMessage.textContent = 'Invalid password or username';
        console.log('Unsuccessful registration');
        alert(result.message); 
    }
});


// Save links
document.getElementById('link-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('link-title').value;
    const url = document.getElementById('link-url').value;
    const tag = document.getElementById('link-tag').value;
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    
    try {
        const response = await fetch('/api/links', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, url, tag, userId }),
        });

        const result = await response.json();

        if (response.ok) {
            // Clear the input fields after successful submission
            document.getElementById('link-form').reset();
            // Refresh the links list
            fetchLinks();
            // Optionally, show a success message
            console.log(result.message); // or display it in the UI
          
        } else {
            console.error(result.message || 'Error saving link');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


// Get links library
async function fetchLinks() {
    const userId = localStorage.getItem('userId'); // Get user ID from local storage
    const response = await fetch(`/api/links?userId=${userId}`); // Pass user ID as a query parameter
    const links = await response.json();
    const linksContainer = document.getElementById('links-container');

    linksContainer.innerHTML = ''; // Clear existing links

    links.forEach(link => {
        const linkItem = document.createElement('div');
        linkItem.innerHTML = `
            <h3>${link.title}</h3>
            <a href="${link.url}" target="_blank">${link.url}</a>
            <p>Tag: ${link.tag}</p>
        `;
        linksContainer.appendChild(linkItem);
    });
}

// Fetch links only on the links page
if (window.location.pathname === '/links.html') {
    fetchLinks(); // Initial fetch
}

// Sign out 
document.getElementById('sign-out').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('userId'); // Clear user ID from local storage
    window.location.href = '/login.html'; // Redirect to login page
});