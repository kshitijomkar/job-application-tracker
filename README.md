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

jt/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── models/
│ │ ├── jobs.js
│ │ └── user.js
│ ├── routes/
│ │ ├── auth.js
│ │ └── jobs.js
│ └── server.js
└── job-tracker-frontend/
└── src/
├── AddJob.js
├── App.js
├── Dashboard.js
├── EditJob.js
├── Login.js
├── Register.js
├── styles.css
└── other supporting files

yaml
Copy
Edit

---

## 🚀 Getting Started

### 🧰 Prerequisites

- Node.js
- npm
- MongoDB Atlas account

### 📦 Backend Setup

```bash
cd backend
npm install
Create a .env file in backend/ with:

ini
Copy
Edit
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
PORT=5000
Start the server:

bash
Copy
Edit
npm start
🎨 Frontend Setup
bash
Copy
Edit
cd job-tracker-frontend
npm install
npm start
Frontend will run on http://localhost:3000.

🛠 Technologies Used
MongoDB + Mongoose

Express.js

React.js

Node.js

JWT (Authentication)

CSS Modules + Custom Styling

🌍 Deployment (Optional)
Backend (Render)
Create a new Web Service

Connect your GitHub repo

Set environment variables (MONGO_URI, JWT_SECRET)

Build Command: npm install

Start Command: npm start

Frontend (Vercel)
Import the frontend folder as a new project

Set environment variables if needed

Vercel auto-builds and deploys

🙋‍♂️ Author
Made with ❤️ by @kshitijomkar

