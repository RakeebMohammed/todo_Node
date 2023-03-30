# todo_node
A simple todo app built with Node.js, Express, and MongoDB, with server-side rendering using Handlebars as the templating engine.The app typically allows users to create,delete and make actions on the tasks. It may include task completion and cancellation

NOTE: Please read the Getting Started section before opening an issue.

Getting Started:

To run this todo app on your local machine, follow these steps:

Clone this repository
Setup Enviornment variables
Install the required dependencies using npm install
Start the application using npm start
Open http://localhost:3000 in your web browser to access the site

Features:

1. Add task with priority
2. Display task in an ordered fashion on proirity basis
3. Delete task
4. Cancel tsk
5. Complete task

API :
1. method: get,url: / -landing page
2. method: post ,url :/addTask - for creating new task
3. method: get , url : /cancelTask -for cancelling task
4. method: get , url : /completeTask -for marking task completed
5. method: get , url : /deleteTask -for deleting task


Acknowledgments

Node.js
Express
MongoDB
Handlebars
