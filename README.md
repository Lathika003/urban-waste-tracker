# Urban Waste Tracker

## Problem Description
Urban areas often face significant challenges when it comes to efficiently tracking, reporting, and managing different types of waste (such as organic, plastic, and electronic waste). Traditional systems lack real-time visibility, leading to delayed collections, resource mismanagement, and environmental hazards. Citizens have no direct way to alert authorities about uncollected waste, and collection teams struggle to prioritize their routes.

## Proposed Solution
**Urban Waste Tracker** is a modern, real-time web application designed to bridge the gap between citizens and waste management teams. It provides a platform where users can instantly report waste locations along with their specific categories. The system features a live dashboard that displays active reports, allowing collection teams to monitor, filter by category or status, and efficiently mark tasks as "Collected" once the waste has been cleared.

## Features
- **Real-Time Reporting:** Instantly report new waste findings with specific locations.
- **Waste Categorization:** Categorize waste into Plastic, Organic, E-Waste, or General/Mixed.
- **Status Tracking:** Track the lifecycle of a report from **Pending** to **Collected**.
- **Live Dashboard:** View all reports on a highly responsive, modern dark-themed UI.
- **Advanced Filtering:** Filter reports by waste category or collection status.
- **Timestamps:** Precise tracking of when a report was created and when it was collected.

## Technologies Used
- **Frontend:** React.js (Vite), Tailwind CSS (v4), Lucide React (Icons), Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB, Mongoose (with comprehensive validation and error handling).

## API Endpoints

### 1. Create a New Report
- **URL:** `/api/waste/create`
- **Method:** `POST`
- **Body Example:**
  ```json
  {
    "location": "No 15, Galle Road, Colombo",
    "wasteType": "E-Waste",
    "status": "Pending",
    "description": "Old televisions and monitors left on the pavement."
  }
  ```

### 2. Get All Reports
- **URL:** `/api/waste/getall`
- **Method:** `GET`
- **Response:** Returns an array of all waste report objects.

### 3. Get a Specific Report
- **URL:** `/api/waste/getone/:id`
- **Method:** `GET`
- **Response:** Returns the specific waste report matching the ID.

### 4. Update Report Status
- **URL:** `/api/waste/update/:id`
- **Method:** `PUT`
- **Body Example:**
  ```json
  {
    "status": "Collected"
  }
  ```

### 5. Delete a Report
- **URL:** `/api/waste/delete/:id`
- **Method:** `DELETE`
- **Response:** Confirms deletion of the specific report.

## Setup Instructions

1. **Clone the repository** (if using version control) or download the project files.
2. **Install Backend Dependencies:**
   Open a terminal in the root directory (`urban-waste-tracker`) and run:
   ```bash
   npm install
   ```
3. **Install Frontend Dependencies:**
   Navigate to the `frontend` directory and run:
   ```bash
   cd frontend
   npm install
   ```
4. **Environment Configuration:**
   Create a `.env` file in the root directory (`urban-waste-tracker`) and add the following variables:
   ```env
   PORT=8000
   MONGO_URL=your_mongodb_connection_string_here
   ```

## How to Run the Project

To run this application locally, you will need to start both the backend server and the frontend development server.

**1. Start the Backend Server**
Open a terminal in the root directory (`urban-waste-tracker`) and run:
```bash
npm start
```
*(The server should start running on `http://localhost:8000`)*

**2. Start the Frontend Server**
Open a new terminal, navigate to the frontend directory, and run:
```bash
cd frontend
npm run dev
```
*(The frontend application will be accessible at `http://localhost:5173`)*
