// Module handles server setup, API endpoints, handling requests from client

const fastify = require('fastify')({ logger: true });
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbModule = require('./sqlite.js');


// Middleware
fastify.register(require('@fastify/formbody'));
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
});

// User Registration
fastify.post('/api/users/register', async (request, reply) => {
    const { username, password } = request.body;
      if (!username || !password) {
        return reply.status(400).send({ message: 'Username and password are required' });
    }
  
  try {
      const result = await dbModule.registerUser(username, password);
      reply.code(201).send(result);
    } catch (error) {
      reply.code(500).send({ message: error.message });
    }

});

// User Login
fastify.post('/api/users/login', async (request, reply) => {
  const { username, password } = request.body;
  try {
      const result = await dbModule.loginUser(username, password);
      reply.send(result);
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
});

// Save Link
fastify.post('/api/links', async (request, reply) => {
  const { title, url, tag, userId } = request.body;
  //const userId = request.session.userId; // SESSION HEREEEE
    try {
        const result = await dbModule.saveLink(title, url, tag, userId);
        reply.status(201).send(result);
    } catch (error) {
        reply.status(500).send({ message: 'Error saving link' });
    }
});


// Get Links
fastify.get('/api/links', async (request, reply) => {
    const userId = request.query.userId;
    try {
        const links = await dbModule.getAllLinks(userId); // Call the new getAllLinks method
      
        if (links.length === 0) {
            return reply.send({ message: "User has no links yet." }); // Placeholder response
        }
        reply.send(links);
      
    } catch (error) {
        reply.status(500).send({ message: error.message });
    }
});

// Sign out 
fastify.get('/logout', (request, reply) => {
    request.session.userId = null; // Clear the user session
    reply.redirect('/login'); // Redirect to the login page
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({port: process.env.PORT, host: "0.0.0.0"});
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();