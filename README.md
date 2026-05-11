# Urban Waste Tracker 🌍♻️

A modern, full-stack web application designed to address the real-world problem of urban waste management. It provides a structured system for residents to report waste for collection and for municipal authorities to track and manage these requests efficiently.

## 🚀 Features

- **Request Submission**: Users can submit new waste pickup requests specifying location and waste type.
- **Real-time Tracking**: View a list of all current and past pickup requests.
- **Status Management**: Authorities can update the status of requests (e.g., from "Pending" to "Collected").
- **Record Maintenance**: Easily remove completed or incorrect records.
- **Modern UI**: A premium, responsive Dark Theme UI built with React and Tailwind CSS v4.
- **RESTful API**: A robust Node.js and Express backend connected to MongoDB.

## 💻 Tech Stack

**Frontend:**
- React (via Vite)
- Tailwind CSS v4
- Lucide React (Icons)
- Axios (HTTP API Client)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- dotenv, cors, body-parser

## 🛠️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) installed and running (or a MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/Lathika003/urban-waste-tracker.git
cd urban-waste-tracker
```

### 2. Backend Setup
1. Open the root directory (`urban-waste-tracker`) in your terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your MongoDB connection string and Port:
   ```env
   PORT=5000
   MONGO_URL=your_mongodb_connection_string_here
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   *The server should run on `http://localhost:8000`*

### 3. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the URL provided by Vite (usually `http://localhost:5173`).

## 📡 API Endpoints

The backend API handles data in JSON format. The base URL is `http://localhost:5000/api/waste`.

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| **GET** | `/getall` | Fetch all waste pickup requests | N/A |
| **POST** | `/create` | Create a new pickup request | `{"location": "Colombo", "wasteType": "Organic"` |
| **PUT** | `/update/:id` | Update the status of a request | `{"status": "Collected"}` |
| **DELETE** | `/delete/:id` | Delete a specific request | N/A |

## 📁 Project Structure

```text
urban-waste-tracker/
├── frontend/             # React Frontend App (Vite + Tailwind CSS v4)
├── models/               # MongoDB Mongoose Schemas (e.g., wasteModel.js)
├── routes/               # Express Routes (e.g., wasteRoutes.js)
├── controller/           # Route Controllers (Logic for API endpoints)
├── .env                  # Environment Variables (DB URL, Port)
├── server.js             # Main Backend Server Entry Point
└── package.json          # Backend Dependencies & Scripts
```
