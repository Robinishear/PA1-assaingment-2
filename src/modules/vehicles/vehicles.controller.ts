import { Request, Response } from "express";
import { vehicleService } from "./vehicles.service.js";

const createVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.createVehicles(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created  successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//
const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getAllVehicles();

    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//
const getSingelVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.getSingleVehicles(
      req.params.id as string
    );

    return res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const updateVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.updateVehicles(
      req.params.id as string,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Vehicles updated  successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteVehicles = async (req: Request, res: Response) => {
  try {
    await vehicleService.deleteVehicles(req.params.id as string);

    return res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesController = {
  createVehicles,
  getAllVehicles,
  getSingelVehicles,
  updateVehicles,
  deleteVehicles,
};
