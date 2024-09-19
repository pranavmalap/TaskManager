# Task Management System

This project is a simple Task Management System that allows users to add, delete, and edit tasks. The system is also capable of managing tasks based on priority levels (High, Medium, Low) and marking tasks as completed.

## Features

- **Add New Task**: Users can create tasks by providing task details such as task name, description, due date, and priority.
- **Delete Task**: Allows users to delete a task from the task list.
- **Edit Task**: Users can modify an existing task (task name, description, due date, and priority). 
- **Manage Task Priority**: Tasks can be filtered based on their priority levels (High, Medium, Low) and users can mark tasks as done.
- **Expand Task Details**: Users can expand a task to see more information, like description and due date.

## Known Issues

- **Edit Task Pre-Filled Fields**: When editing a task, the form fields are not pre-populated with the current task's values. However, if the user enters new values, the edit functionality works as expected.


## Setup and Run Instructions

### Server Setup

1. Navigate to the `server` directory:
   C:TaskProject\cd server
   C:TaskProject\server
   
2. Install dependencies
   npm install
   
3. Run the Server
   npm start


# Client Setup
1. Navigate to client directory
   C:TaskProject\cd client
    C:TaskProject\client

2. Install dependencies
   npm install

3. Run the client
   npm run dev


   
 Tech Stack
Backend: Node.js, Express, MongoDB (Mongoose)
Frontend: React, Axios
Styling: CSS



