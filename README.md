
# 🖥️ Employee Feedback System

A full-stack web application that allows employees to submit feedback and lets administrators view, categorize, and manage the feedback. Built using **React** for the frontend and **Node.js/Express** with **MongoDB** for the backend.

---

## 📁 Project Structure

```
project-root/
│
├── frontend/   → React app for users
└── backend/    → Node.js & Express API server
```

---

## 🎨 Frontend – React App

### 📂 Location

`/frontend`

### 📦 Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

### 🚀 Getting Started

1. Open a terminal and navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

---

## 🛠️ Backend – Node.js + Express + MongoDB

### 📂 Location

`/backend`

### 📦 Requirements

- Node.js
- MongoDB (installed and running locally)
- MongoDB Compass *(optional, for GUI interaction with MongoDB)*

### 🚀 Getting Started

1. Open a terminal and navigate to the backend folder:

    ```bash
    cd backend
    ```

2. Start the backend server:

    ```bash
    npm start
    ```

    > ⚠️ If the backend doesn't start due to missing packages, run:

    ```bash
    npm install
    ```

---

### 🔌 API Endpoints

| Method | Endpoint                                                        | Description                        |
|--------|--------------------------------------------------               |------------------------------------|
| POST   | `http://localhost:5000/api/feedback`                            | Create new feedback                |
| GET    | `http://localhost:5000/api/feedback`                            | Get all feedbacks                  |
| GET    | `http://localhost:5000/api/feedback?category=Work+Environment`  | Get feedbacks by category |
| PUT    | `http://localhost:5000/api/feedback/:id/reviewed`               | Mark feedback as reviewed          |
| DELETE | `http://localhost:5000/api/feedback/:id`                        | Delete a feedback by ID            |
