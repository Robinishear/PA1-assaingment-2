# 🚗 Vehicle Rental System API

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-18+-success?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strongly%20Typed-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Framework-lightgray?logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**A robust and secure backend API for managing a vehicle rental service**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation--setup) • [API Reference](#-api-endpoints-reference) • [Architecture](#-architecture--code-structure)

</div>

---

## 🎯 Project Overview

The Vehicle Rental System API is a comprehensive backend solution designed to manage vehicle rental operations efficiently. This system provides complete management of vehicle inventory, customer profiles, and the entire booking lifecycle through authenticated, role-based endpoints.

### Key Capabilities

- **Vehicle Inventory Management** - Full CRUD operations with real-time availability tracking
- **User Role Management** - Separate access controls for Admins and Customers
- **Smart Booking Engine** - Automatic price calculation and vehicle status management
- **Enterprise Security** - JWT authentication with bcrypt password hashing
- **Role-Based Access Control (RBAC)** - Granular permissions for different user types
- **Data Integrity** - Built-in constraints prevent orphaned records and maintain consistency

---

## 🌟 Features

### For Administrators
- ✅ Complete vehicle fleet management (add, update, delete)
- ✅ View and manage all customer bookings
- ✅ User management and role assignment
- ✅ System-wide analytics and reporting
- ✅ Vehicle availability override controls

### For Customers
- ✅ Browse available vehicles with detailed specifications
- ✅ Create and manage personal bookings
- ✅ View booking history and current rentals
- ✅ Cancel bookings with automatic refund calculation
- ✅ Update personal profile information

### System Features
- 🔒 Secure JWT-based authentication
- 🛡️ Password encryption using bcrypt
- 📊 Automatic price calculation based on rental duration
- 🔄 Real-time vehicle availability updates
- 🚫 Cascading delete prevention for data integrity
- 📝 Comprehensive request validation
- 🎯 RESTful API design principles

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Runtime** | Node.js (v18+) | Server-side JavaScript environment |
| **Language** | TypeScript | Static typing and enhanced code quality |
| **Framework** | Express.js | Fast, minimalist web framework |
| **Database** | PostgreSQL | Robust relational database |
| **Authentication** | JWT (jsonwebtoken) | Secure token-based authentication |
| **Security** | bcrypt | Password hashing and encryption |
| **Validation** | Express Validator | Request data validation |

---

## 🏗️ Architecture & Code Structure

The project follows a **Modular Architecture** with a clear **Layered Pattern** (Route → Controller → Service) ensuring **Separation of Concerns (SoC)** and maintainability.

### Directory Structure

```
src/
├── app.ts                      # Application entry point
├── config/                     # Configuration files
│   ├── db.ts          # Database connection setup
│   └──index.ts             # Environment variables
├── middlewares/               # Custom middleware functions
│   ├── auth.ts   # JWT verification
│   ├── logger.ts    # RBAC implementation
├── modules/                   # Feature-based modules
│   ├── auth/
│   │   ├── auth.route.ts      # Authentication endpoints
│   │   ├── auth.controller.ts # Request handling
│   │   └── auth.service.ts    # Business logic
│   ├── vehicles/
│   │   ├── vehicle.route.ts
│   │   ├── vehicle.controller.ts
│   │   └── vehicle.service.ts
│   ├── bookings/
│   │   ├── booking.route.ts
│   │   ├── booking.controller.ts
│   │   └── booking.service.ts
│   └── users/
│       ├── user.route.ts
│       ├── user.controller.ts
│       └── user.service.ts
├── types/
│── index.d.ts             
├── utils/                     # Helper functions
│   ├── lowercaseEmail.ts
│   ├──role.ts 
└── app.ts               # app initialization   
└── server.ts           # Server initialization
```

### Layered Architecture

| Layer | Responsibility | Example |
|-------|---------------|---------|
| **Routes** | Define API endpoints and map to controllers | `GET /api/v1/vehicles` |
| **Controllers** | Handle HTTP requests/responses, input validation | Parse request body, send JSON response |
| **Services** | Business logic, database operations | Calculate rental price, check availability |
| **Middleware** | Cross-cutting concerns | Authentication, logging, error handling |

---

## ⚙️ Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** package manager
- **Git** for version control

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/vehicle-rental-system-api.git
cd vehicle-rental-system-api
```

#### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

#### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_database_user
DB_PASSWORD=your_secure_password
DB_NAME=rental_system

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Optional: Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### 4. Database Setup

Create the PostgreSQL database:

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE rental_system;

# Exit PostgreSQL
\q
```

Run database migrations:

```bash
npm run migrate
# or
npm run setup:db
```

#### 5. Start the Application

Development mode with hot reload:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

The API server will start on `http://localhost:5000`

---

## 🌍 API Endpoints Reference

Base URL: `http://localhost:5000/api/v1`

### 🔐 Authentication

#### Register New User
```http
POST /auth/signup
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+1234567890"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "uuid-here",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

#### User Login
```http
POST /auth/signin
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "userId": "uuid-here",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "customer"
    }
  }
}
```

---

### 🚗 Vehicles

#### Create Vehicle (Admin Only)
```http
POST /vehicles
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "Toyota Camry 2024",
  "type": "sedan",
  "description": "Comfortable mid-size sedan with advanced safety features",
  "pricePerDay": 75.00,
  "availability": true,
  "features": ["GPS", "Bluetooth", "Backup Camera"]
}
```

#### Get All Vehicles
```http
GET /vehicles
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Vehicles retrieved successfully",
  "data": [
    {
      "vehicleId": "uuid-here",
      "name": "Toyota Camry 2024",
      "type": "sedan",
      "pricePerDay": 75.00,
      "availability": true,
      "features": ["GPS", "Bluetooth", "Backup Camera"]
    }
  ]
}
```

#### Get Single Vehicle
```http
GET /vehicles/:vehicleId
```

#### Update Vehicle (Admin Only)
```http
PUT /vehicles/:vehicleId
Authorization: Bearer {token}
```

#### Delete Vehicle (Admin Only)
```http
DELETE /vehicles/:vehicleId
Authorization: Bearer {token}
```

---

### 📅 Bookings

#### Create Booking
```http
POST /bookings
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "vehicleId": "uuid-here",
  "startDate": "2024-12-15",
  "endDate": "2024-12-20"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "bookingId": "uuid-here",
    "vehicleId": "uuid-here",
    "userId": "uuid-here",
    "startDate": "2024-12-15",
    "endDate": "2024-12-20",
    "totalPrice": 375.00,
    "status": "confirmed"
  }
}
```

#### Get All Bookings
```http
GET /bookings
Authorization: Bearer {token}
```

**Admin:** Returns all bookings  
**Customer:** Returns only their bookings

#### Update Booking Status
```http
PUT /bookings/:bookingId
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "status": "cancelled"  // or "returned" (admin only)
}
```

---

### 👥 Users

#### Get All Users (Admin Only)
```http
GET /users
Authorization: Bearer {token}
```

#### Update User
```http
PUT /users/:userId
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "name": "John Updated",
  "phone": "+1234567890"
}
```

#### Delete User (Admin Only)
```http
DELETE /users/:userId
Authorization: Bearer {token}
```

---

## 📋 Response Format

All API responses follow a consistent JSend-inspired format:

### Success Response
```json
{
  "success": true,
  "message": "Descriptive success message",
  "data": {
    /* Resource data or array */
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": "Detailed error information or validation messages"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | OK - Request successful |
| `201` | Created - Resource created successfully |
| `400` | Bad Request - Invalid input data |
| `401` | Unauthorized - Authentication required |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `409` | Conflict - Resource already exists |
| `500` | Internal Server Error - Server-side error |

---

## 🔒 Authentication & Authorization

### JWT Token Usage

After successful login, include the JWT token in all protected endpoints:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Role-Based Access Control

| Role | Permissions |
|------|------------|
| **Admin** | Full system access - manage vehicles, view all bookings, manage users |
| **Customer** | Limited access - view vehicles, manage own bookings, update own profile |

---

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm run test:coverage
```

---

## 🚀 Deployment

### Environment Setup

1. Set `NODE_ENV=production` in your `.env` file
2. Use a strong `JWT_SECRET`
3. Configure production database credentials
4. Enable SSL for PostgreSQL connections

### Recommended Platforms

- **Heroku** - Easy deployment with PostgreSQL add-on
- **AWS EC2** - Full control over server configuration
- **DigitalOcean** - App Platform or Droplets
- **Render** - Modern cloud platform with free tier

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Best Practices](https://jwt.io/introduction)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Profile](https://linkedin.com/in/yourprofile)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- Express.js team for the amazing framework
- PostgreSQL community for the robust database
- All contributors who help improve this project

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Your Name]

</div>
