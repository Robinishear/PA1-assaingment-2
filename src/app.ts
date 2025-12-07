import express from "express";
import initDB from "./config/db.js";
import { userRouter } from "./modules/users/user.route.js";
import { vehiclesRouter } from "./modules/vehicles/vehicles.route.js";
import { authRouter } from "./modules/auth/user.route.js";
import { bookingsRouter } from "./modules/bookings/bookings.route.js";
const app = express();
app.use(express.json());

initDB();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vehicles", vehiclesRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingsRouter);

//
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

export default app;
