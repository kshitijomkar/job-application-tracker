# Job Application Tracker

An AI-powered job application tracker and career guidance platform built with the MERN stack (MongoDB, Express, React, Node.js). This project helps users manage job applications and provides career recommendations based on their data.

## ✨ Features

- ✅ User Registration & Login (JWT-based authentication)
- 📄 Add, Edit, Delete job applications
- 📊 Dashboard view of all jobs
- 📝 Notes and Interview Dates
- 🌐 Responsive, modern UI
- 🔒 Protected routes (only authenticated users can access the dashboard)

---

## 📁 Project Structure

jt/<br>
├── backend/<br>
│ ├── config/<br>
│ │ └── db.js<br>
│ ├── middleware/<br>
│ │ └── authMiddleware.js<br>
│ ├── models/<br>
│ │ ├── jobs.js<br>
│ │ └── user.js<br>
│ ├── routes/<br>
│ │ ├── auth.js<br>
│ │ └── jobs.js<br>
│ └── server.js<br>
└── job-tracker-frontend/<br>
└── src/<br>
├── AddJob.js<br>
├── App.js<br>
├── Dashboard.js<br>
├── EditJob.js<br>
├── Login.js<br>
├── Register.js<br>
├── styles.css<br>
└── other supporting files<br>
<br>

## 🚀 Getting Started

### 🧰 Prerequisites

- Node.js
- npm
- MongoDB Atlas account

### Backend Setup

1. Navigate to the `backend` folder:

```bash
cd backend
```
2. Install dependencies:

```bash
npm install
```
3. Create a .env file in the backend folder with the following variables:

MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

4. Start the backend server

```bash
npm start
```

### Frontend Setup

1. Navigate to the job-tracker-frontend folder:

```bash
cd job-tracker-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

The frontend will run on http://localhost:3000.

   

## 🛠 Technologies Used

MongoDB & Mongoose

Express.js

React.js

Node.js

JWT for authentication

CSS for styling

## 🌍 Deployment (Optional)

### Backend (Render)

Create a new Web Service

Connect your GitHub repo

Set environment variables (MONGO_URI, JWT_SECRET)

Build Command: npm install

Start Command: npm start

### Frontend (Vercel)

Import the frontend folder as a new project

Set environment variables if needed

Vercel auto-builds and deploys

🙋‍♂️ Author
Made with ❤️ by @kshitijomkar

