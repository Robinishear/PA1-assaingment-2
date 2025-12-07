API Response Structure (Common Responses)

✨ GitHub README.md (Formatted for Professional Look)
Markdown

# 🚗 Vehicle Rental System API

[![Node.js](https://img.shields.io/badge/Node.js-18+-success?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strongly%20Typed-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Framework-lightgray?logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql)](https://www.postgresql.org/)

---

## 🎯 Project Goal

A robust and secure backend API for managing a vehicle rental service. This system provides comprehensive management of vehicle inventory, customer profiles, and the entire booking lifecycle through authenticated, role-based endpoints.

## 🌟 Features Implemented

* **Vehicle Management:** CRUD operations for vehicles, including availability tracking.
* **User Management:** Separate roles for **Admin** and **Customer**.
* **Booking Engine:** Calculates total price based on rental duration and manages vehicle status updates automatically.
* **Secure Authentication:** User registration/login secured with **bcrypt** for password hashing and **JWT** for token-based authorization.
* **Role-Based Access Control (RBAC):** Strict middleware ensures that Admins have full access and Customers are limited to viewing vehicles and managing their own bookings.
* **Data Integrity:** Deletion constraints prevent removing Users or Vehicles with active bookings.

---

## 🛠️ Technology Stack

| Category | Technology | Version / Tool | Role |
| :--- | :--- | :--- | :--- |
| **Runtime** | **Node.js** | Latest LTS | Server-side environment. |
| **Language** | **TypeScript** | | Adds static typing and improves code quality. |
| **Framework** | **Express.js** | | Minimalist, unopinionated web framework. |
| **Database** | **PostgreSQL** | | Primary data store for relational data. |
| **Security** | **bcrypt** | | Password hashing. |
| **Authentication**| **jsonwebtoken (JWT)** | | Token-based security mechanism. |

---

## 🏗️ Architecture & Code Structure

The project strictly follows a **Modular Architecture** with a clear **Layered Pattern** (Route -> Controller -> Service) to ensure **Separation of Concerns (SoC)** and easy maintenance.

src/ ├── middlewares/ # Auth and Role-based Access Control (RBAC) ├── modules/ # Feature-based Modules (auth, users, vehicles, bookings) │ ├── [feature]/ │ │ ├── [feature].route.ts # Defines API Endpoints │ │ ├── [feature].controller.ts # Handles Request/Response, calls Service layer │ │ └── [feature].service.ts # Contains all business logic and database queries └── app.ts # Express setup and global middleware



---

## ⚙️ Installation & Setup

### Prerequisites

You must have the following installed on your machine:

* **Node.js** (v18+)
* **PostgreSQL** Database Server

### Step-by-Step Guide

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd vehicle-rental-system-api
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a file named `.env` in the root directory and configure your PostgreSQL connection and JWT secret:

    ```env
    # Application Config
    PORT=5000

    # PostgreSQL Database Configuration
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=rental_system

    # JWT Authentication Config
    JWT_SECRET=YOUR_VERY_STRONG_SECRET_KEY
    JWT_EXPIRES_IN=1d
    ```

4.  **Run Migrations / Setup Database:**
    *(Assuming you use a script to set up tables and relations based on the schema)*
    ```bash
    npm run setup:db
    ```

5.  **Start the Server:**
    ```bash
    # Development Mode (with file watching)
    npm run dev

    # Production Build
    npm run build
    npm start
    ```

The API will be running on the specified port (e.g., `http://localhost:5000/api/v1`).

---

## 🌍 API Endpoints Reference

All endpoints are prefixed with `/api/v1`.

### 1. 🔐 Authentication

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/signup` | Public | Register a new user (`customer` role by default). |
| `POST` | `/auth/signin` | Public | Login and receive **JWT token** and user details. |

### 2. 🚗 Vehicles

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/vehicles` | **Admin Only** | Add a new vehicle. |
| `GET` | `/vehicles` | Public | Retrieve all available vehicles. |
| `GET` | `/vehicles/:vehicleId`| Public | Retrieve details of a specific vehicle. |
| `PUT` | `/vehicles/:vehicleId`| **Admin Only** | Update vehicle details or daily price. |
| `DELETE` | `/vehicles/:vehicleId`| **Admin Only** | Delete vehicle (only if no active bookings). |

### 3. 📅 Bookings

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/bookings` | Customer/Admin | Create a new booking. **Calculates price** and updates vehicle status to "booked". |
| `GET` | `/bookings` | Role-based | Admin views **all** bookings; Customer views **own** bookings. |
| `PUT` | `/bookings/:bookingId`| Role-based | Customer can "cancel"; Admin can mark as "returned" (updates vehicle to "available"). |

### 4. 👥 Users

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/users` | **Admin Only** | Retrieve all users in the system. |
| `PUT` | `/users/:userId`| Admin or Own | Admin can update role/details; Customer can update own details. |
| `DELETE` | `/users/:userId`| **Admin Only** | Delete user (only if no active bookings). |

---

## 💬 Common Response Structure

All successful API responses adhere to the JSend-like standardized format:

### Success Response (200 OK / 201 Created)

```json
{
  "success": true,
  "message": "Operation description",
  "data": {
    /* Resource object or array */
  }
}
Error Response (400, 401, 403, 404, 500)
JSON

{
  "success": false,
  "message": "Error description",
  "errors": "Specific error details or validation messages"
}
