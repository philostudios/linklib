# MultiModal Ventures Skills Assessment

## Project Overview: 📖

This project is a Node app with SQLite database storing users and respective links. The app also includes a front-end with 3 webpages that connect to the database using the server API.

The registration page allows new users to create a unique account which can store their social media links. The LinkLibrary is comprised of the form to save links, including a title, URL and tag for each social media site. It also lists a previously saved links below for easy access. The LinkLibrary allows users to log out and sign back in if they would like.

Alternatively, you can access source code [here](https://glitch.com/edit/#!/polite-cyan-front), or the live site [here](https://polite-cyan-front.glitch.me).

\_Last updated: 31 Dec 2024

## What's in this project?

← `README.md`: That’s this file, an overview of the project, what it does and how I built it.

← `package.json`: The NPM packages for my project's dependencies.

← `.env`: The environment is cleared when you initially remix the project, but you will add a new env variable value when you follow the steps in `TODO.md` to set up an admin key.

### Server and database

← `server.js`: The Node.js server script for the site. The JavaScript defines the endpoints in the site API. The API processes requests, connects to the database using the `sqlite` script in `src`, and sends info back to the client.

← `sqlite.js`: The database script handles setting up and connecting to the SQLite database. The `server.js` API endpoints call the functions in the database script to manage the data. When the app runs, the scripts build the database (called database.db)

### User interface

← `public/style.css`: The style rules that define the site appearance. (Didn’t get to this part)

← `public/index.html`: Front-end registration page, creating a new user.

← `public/links.html`: Front-end link library page, adding and displaying links.

← `public/login.html`: Front-end login page, signing into a previously registered account.

← `public/script.js`: Interacts with backend API to verify user credentials and store user data securely. Handles user authentication, login/registration functionalities.

## My Reflection 🖊️

In total, this project took me about 5 hours to complete, I initially had setup errors on my local computer and ended up using Glitch.com, an online code editor that handles backend and frontend processing.

Resources used: I used ChatGPT to help structure, debug and write code, as I had no experience with backend API and SQLite before.

### Next steps:

- Create input validation, client-side and as well as invalid input.

- Create security functionality for hashing and making minimum requirements for passwords so that it’s stored on the database more securely. Security wise, I would also use emails instead of usernames so that I can create verification steps at sign up and log in.

- Create a more friendly/responsive User Interface, with loading indicators, success messages and a library-looking list with visuals attached to links, and each social media source icon displayed.
