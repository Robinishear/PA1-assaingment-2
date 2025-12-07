import { Request, Response } from "express";
import { bookingsService } from "./bookings.service.js";
import { role } from "../../utils/role.js";

const createBooking = async (req: Request, res: Response) => {
  // console.log(req.body);
  try {
    const result = await bookingsService.createBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsService.getAllBookings(req.users);
    res.status(200).json({
      success: true,
      message:
        req.users?.role === role.admin
          ? "Bookings retrieved successfully"
          : "Your bookings retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ========================================
const updateBookings = async (req: Request, res: Response) => {
  try {
    const bookingId = req.params.id;
    const user = req.users;
    const result = await bookingsService.updateBookings(
      bookingId as string,
      req.body,
      user
    );

    res.status(200).json({
      success: true,
      message:
        result.status === "cancelled"
          ? "Booking cancelled successfully"
          : "Booking marked as returned. Vehicle is now available",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// ===========================================
const autoReturnBookings = async (req: any, res: any) => {
  try {
    const updatedBookings = await bookingsService.autoReturnBookings();

    return res.status(200).json({
      success: true,
      message: "Auto-return process completed",
      updatedBookings,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export const bookingsController = {
  createBooking,
  getAllBookings,
  updateBookings,
  autoReturnBookings,
};
