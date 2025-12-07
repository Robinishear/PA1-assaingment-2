import { Router } from "express";
import { vehiclesController } from "./vehicles.controller.js";
import auth from "../../middleware/auth.js";
import { role } from "../../utils/role.js";

const router = Router();
router.post("/", auth(role.admin), vehiclesController.createVehicles);

router.get(
  "/",
  auth(role.admin, role.customer),
  vehiclesController.getAllVehicles
);

router.get(
  "/:id",
  auth(role.admin, role.customer),
  vehiclesController.getSingelVehicles
);

router.put("/:id", auth(role.admin), vehiclesController.updateVehicles); //

router.delete("/:id", auth(role.admin), vehiclesController.deleteVehicles); //

export const vehiclesRouter = router;
