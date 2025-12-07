🚗 Vehicle Rental System API🎯 Project OverviewThis is a Vehicle Rental Management System implemented as a robust backend API. The system manages vehicle inventory, customer accounts, and the entire vehicle rental lifecycle, including booking, cost calculation, and returns.The API is designed with security and scalability in mind, featuring role-based access control (Admin/Customer) secured by JWT authentication.Key FeaturesVehicles: Full inventory management with availability tracking.Customers: Account and profile management with distinct roles.Bookings: Handling rentals, calculating costs based on duration, and managing status (active, cancelled, returned).Authentication & Authorization: Secure login/signup and role-based access control.🛠️ Technology StackThe project utilizes a modern and efficient technology stack for building a high-performance backend application.CategoryTechnologyPurposeBackendNode.js + TypeScriptRuntime environment and static typing for robust development.Web FrameworkExpress.jsMinimalist and flexible web application framework.DatabasePostgreSQLPowerful, open-source object-relational database.Authjsonwebtoken (JWT)Secure token-based authentication.SecuritybcryptHashing and salting user passwords.📁 Code Structure (Modular Pattern)The codebase is organized following a Modular Pattern with a clear separation of concerns (SoC) to ensure maintainability and scalability. Each major feature resides in its own module, and all modules follow a consistent layered architecture.src/
├── app.ts                  # Application entry point & Express setup
├── config/                 # Configuration files (e.g., environment variables)
├── db/                     # Database connection/initialization
├── middlewares/
│   ├── authMiddleware.ts   # JWT verification and user extraction
│   └── roleMiddleware.ts   # Role-based access control (Admin, Customer)
├── modules/                # Feature-based modules (The core logic)
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.route.ts
│   │   └── auth.service.ts
│   ├── bookings/
│   │   ├── booking.controller.ts
│   │   ├── booking.route.ts
│   │   └── booking.service.ts
│   ├── users/
│   │   ├── user.controller.ts
│   │   ├── user.route.ts
│   │   └── user.service.ts
│   └── vehicles/
│       ├── vehicle.controller.ts
│       ├── vehicle.route.ts
│       └── vehicle.service.ts
└── utils/                  # Utility functions (e.g., date calculation, price calculation)
📊 Database SchemaThe system uses a PostgreSQL database with three core tables, linked by relational foreign keys.Users TableFieldNotesidAuto-generated primary keynameRequiredemailRequired, unique, lowercasepasswordRequired, min 6 characters, hashed using bcryptphoneRequiredrole'admin' or 'customer'Vehicles TableFieldNotesidAuto-generated primary keyvehicle_nameRequiredtype'car', 'bike', 'van' or 'SUV'registration_numberRequired, uniquedaily_rent_priceRequired, positiveavailability_status'available' or 'booked'Bookings TableFieldNotesidAuto-generated primary keycustomer_idForeign Key to Users tablevehicle_idForeign Key to Vehicles tablerent_start_dateRequiredrent_end_dateRequired, must be after rent_start_datetotal_priceRequired, positive (Calculated: daily_rent_price * duration)status'active', 'cancelled' or 'returned'🔐 Authentication & AuthorizationUser Roles and PermissionsRolePermissionsAdminFull system access. Can manage all vehicles, all users, and all bookings.CustomerCan register, view vehicles, and create/manage own bookings. Can update own profile.Authentication FlowRegistration: New users register via /api/v1/auth/signup. Passwords are hashed using bcrypt.Login: Users login via /api/v1/auth/signin and receive a JWT (JSON Web Token).Authorization: For protected routes, the JWT must be sent in the request header: Authorization: Bearer <token>.Middleware: The system validates the token and checks the user's role against the required permissions for the requested endpoint. Access is granted (200 OK) or denied (401 Unauthorized or 403 Forbidden).🌐 API Endpoints ReferenceAll endpoints are prefixed with /api/v1.🔐 AuthenticationMethodEndpointAccessDescriptionPOST/auth/signupPublicRegister a new user account.POST/auth/signinPublicLogin and receive a JWT token.🚗 VehiclesMethodEndpointAccessDescriptionPOST/vehiclesAdmin onlyAdd a new vehicle to inventory.GET/vehiclesPublicView all vehicles.GET/vehicles/:vehicleIdPublicView specific vehicle details.PUT/vehicles/:vehicleIdAdmin onlyUpdate vehicle details, price, or availability.DELETE/vehicles/:vehicleIdAdmin onlyDelete vehicle (only if no active bookings exist).👥 UsersMethodEndpointAccessDescriptionGET/usersAdmin onlyView all users in the system.PUT/users/:userIdAdmin or OwnAdmin can update any user. Customer can update own profile only.DELETE/users/:userIdAdmin onlyDelete a user (only if no active bookings exist).📅 BookingsMethodEndpointAccessDescriptionPOST/bookingsCustomer/AdminCreate a new booking. Validates availability and calculates total_price. Updates vehicle status to "booked".GET/bookingsRole-basedAdmin views all bookings. Customer views own bookings only.PUT/bookings/:bookingIdRole-basedCustomer: Cancel booking (before start date). Admin: Mark as "returned".Business Logic NotesPrice Calculation: total_price = daily_rent_price × number_of_daysAvailability Update:POST /bookings changes vehicle status to "booked".PUT /bookings/:bookingId to "returned" or "cancelled" changes vehicle status back to "available".Deletion Constraints: Cannot delete a User or Vehicle if they are associated with an active booking (status: "active").⚙️ How to Run LocallyPrerequisitesNode.js (v18+)PostgreSQLTypeScriptSetup StepsClone the repository:Bashgit clone <repository_url>
cd vehicle-rental-system-api
Install dependencies:Bashnpm install
Configure environment variables:Create a .env file in the root directory and add your database and JWT configuration:# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=rental_system

# JWT Authentication
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
Run migrations/database setup (If using an ORM/migration tool):Bash# Example: run a setup script for tables
npm run setup:db
Start the development server:Bashnpm run dev
