# 🎓 College Predictor

A full-stack web application that predicts suitable colleges for students based on their entrance exam rank, category, and preferences. Built using **React** for the frontend and **Node.js/Express** for the backend, with MongoDB for data storage.

---

## 🚀 Features

- 🎯 Predict colleges based on entrance exam rank (MHT CET).
- 📊 Filters based on category (General, OBC, SC, ST, etc.), gender, and home state.
- 🗺️ Region-wise college sorting (COEP, PICT, PCCOE, DYP).
- 🧠 Smart algorithm for more accurate predictions.
- 🔍 Real-time results with a clean, responsive UI.

---

## 🖥️ Tech Stack

### Frontend
- React.js
- HTML5, CSS3
- Axios for API calls
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- RESTful API structure
- dotenv for configuration

---

## 📁 Project Structure

college-predictor/
├── frontend/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ └── App.js
├── backend/ # Node/Express backend
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ └── server.js
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/atulranjan45/college-predictor.git
cd college-predictor

2. Backend Setup
cd backend
npm install
npm start
