import { Router } from "express";
import { bookingsController } from "./bookings.controller.js";
import auth from "../../middleware/auth.js";
import { role } from "../../utils/role.js";

const router = Router();
router.post(
  "/",
  auth(role.admin, role.customer),
  bookingsController.createBooking
);
router.get(
  "/",
  auth(role.admin, role.customer),
  bookingsController.getAllBookings
);

router.put(
  "/:id",
  auth(role.admin, role.customer),
  bookingsController.updateBookings
);
router.put(
  "/auto-return",
  auth(role.admin),
  bookingsController.autoReturnBookings
);
export const bookingsRouter = router;
