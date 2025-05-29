# 🖥️Employee Feedback System


# Frontend 
This is the **React** frontend of the Employee Feedback System. It allows users to submit feedback and view responses from the admin.

---

## 📦 Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

---
## Backend 

## 🚀 Getting Started

### 1. Install Dependencies

Navigate to the frontend folder and install packages:

```bash
cd frontend
npm install
npm start 

### 2. Backend --

This is the **Node.js** and **Express** backend API for the Employee Feedback System. It stores user feedback data in a local MongoDB database.

---

## 📦 Requirements

- Node.js
- MongoDB installed and running locally
- MongoDB Compass (optional, for GUI)

---

## 🚀 Getting Started


Navigate to the backend folder and run:

```bash
cd backend
npm start 
*if backend starts good if not then install npm 
npm install

 ---------- api's -------
1)create feedback 
http://localhost:5000/api/feedback

2)get all feedbacks
http://localhost:5000/api/feedback

3)get feedback by category
http://localhost:5000/api/feedback?category=Work+Environment
4)mark viewd feedback

http://localhost:5000/api/feedback/:id/reviewed

5)delete feedback
http://localhost:5000/api/feedback/:id
