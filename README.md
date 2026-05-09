# Urban Community Waste Tracker

This project is a web-based software solution developed for the **Web Services and Technology (IT2234)** module. It addresses the real-world problem of urban waste management by providing a structured backend system for collection tracking.

## 1. Problem Description
In many urban areas, a lack of clear communication between residents and waste collection services leads to inefficient disposal. When residents are unaware of collection schedules, waste often accumulates on streets, leading to environmental pollution and public health hazards.

## 2. Proposed Solution
The Urban Community Waste Tracker provides a centralized **RESTful API** that allows residents to report waste for collection. Municipal authorities can use the system to track these requests, manage collection tasks in real-time, and maintain digital records to ensure timely disposal.

## 3. Features
The system implements full **CRUD (Create, Read, Update, Delete)** functionality:
* [cite_start]**Request Submission**: Allows users to create new waste pickup entries (POST)[cite: 36].
* [cite_start]**Data Retrieval**: Provides a list of all current pickup requests (GET)[cite: 37].
* [cite_start]**Status Management**: Enables authorities to update the status of a request (e.g., from "Pending" to "Collected") (PUT/PATCH)[cite: 38].
* [cite_start]**Record Maintenance**: Allows for the removal of completed or incorrect records (DELETE)[cite: 39].

## 4. Technologies Used
* [cite_start]**Backend**: Node.js and Express.js [cite: 29]
* [cite_start]**Database**: MongoDB [cite: 32]
* [cite_start]**API Testing**: Postman [cite: 41]
* [cite_start]**Version Control**: GitHub [cite: 60]

## 5. API Endpoints
All API endpoints handle data in JSON format and include basic error handling.

| Method | Endpoint | Description | Sample Request Body |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/waste` | Create a new pickup request | `{"location": "Vavuniya", "type": "Organic"}` |
| **GET** | `/api/waste` | Retrieve all requests | N/A |
| **PUT** | `/api/waste/:id` | Update request status | `{"status": "Collected"}` |
| **DELETE** | `/api/waste/:id` | Remove a specific record | N/A |
