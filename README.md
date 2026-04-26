# 🐶 Dog Breeds Manager

A full-stack web application that allows users to view, create, update, and delete dog breeds along with their sub-breeds.

---

## 🚀 Live Demo

- **Frontend (Vercel):** https://your-frontend-url.vercel.app
- **Backend (Render):** https://your-backend-url.onrender.com

---

## 📂 Project Structure

dog-breeds-manager/

- frontend/ → Next.js application (UI)
- backend/ → Express.js API (CRUD operations + persistence)

---

## ⚙️ How to Run Locally

### 1. Clone the Repository

git clone https://github.com/your-username/dog-breeds-manager.git
cd dog-breeds-manager

---

### 2. Run Backend

cd backend
npm install
npm start

Backend will run at:
http://localhost:3001

---

### 3. Run Frontend

cd frontend
npm install
npm run dev

Frontend will run at:
http://localhost:3000

---

## 🔌 API Endpoints

- GET /dogs → Get all dog breeds
- POST /dogs → Create a new breed
- PUT /dogs/:breed → Update sub-breeds
- DELETE /dogs/:breed → Delete a breed

---

## ✨ Features

- Add new dog breeds
- Edit existing sub-breeds
- Delete dog breeds
- Persistent data using JSON file
- Responsive and user-friendly UI
- Smooth scrolling and edit experience

---

## 🧠 Design Decisions

- Used **Express.js** for a simple and lightweight backend
- Used **JSON file storage** for persistence (as per assignment scope)
- Built frontend with **Next.js** for better structure and performance
- Followed a **decoupled architecture** (frontend + backend separated logically)

---

## ⚠️ Notes

- Backend is hosted on Render free tier → may take a few seconds to wake up (cold start)
- Data is stored in a local JSON file → suitable for small-scale applications

---

## 🚀 Future Improvements

- Add database (MongoDB / PostgreSQL)
- Add search and filtering
- Add authentication
- Improve UI feedback (toasts, loaders)

---
