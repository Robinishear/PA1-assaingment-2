import { pool } from "../../config/db.js";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const isExist = await pool.query(
    `  
     SELECT * FROM vehicles WHERE registration_number = $1 
    `,
    [registration_number]
  );

  if (isExist.rows.length > 0) {
    throw new Error(
      `Vehicle  '${vehicle_name}' registration_number  ${registration_number} already exists`
    );
  }
  const result = await pool.query(
    `
    INSERT INTO vehicles (vehicle_name,type, registration_number,daily_rent_price,availability_status)
     VALUES ($1,$2,$3,$4,$5) RETURNING * 
    `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};
//===================

const getAllVehicles = async () => {
  const result = await pool.query(`
  
  SELECT * FROM vehicles 
  `);
  if (result.rows.length === 0) {
    throw new Error("No vehicles found");
  }
  return result;
};

// ====================

const getSingleVehicles = async (id: string) => {
  const result = await pool.query(
    `
  SELECT * FROM vehicles WHERE id = $1
  `,
    [id]
  );
  if (result.rows.length === 0) {
    throw new Error("No vehicles found");
  }
  // console.log(id);
  return result;
};
//===================

const updateVehicles = async (id: string, payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `
 UPDATE vehicles
 SET vehicle_name = $1, type=$2, registration_number=$3, daily_rent_price=$4,availability_status=$5
 WHERE id =$6
 RETURNING *
  `,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );
  if (result.rows.length === 0) {
    throw new Error("No vehicles found");
  }
  return result;
};

// ==================

const deleteVehicles = async (vehicleId: string) => {
  //  Check if vehicle exists
  const vehicleCheck = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);

  if (!vehicleCheck.rows.length) {
    throw new Error("No vehicles found");
  }

  //  Check active bookings
  const activeBookings = await pool.query(
    `SELECT * FROM bookings WHERE vehicle_id=$1 AND status='active'`,
    [vehicleId]
  );

  if (activeBookings.rows.length) {
    throw new Error("Cannot delete vehicle with active bookings");
  }

  // delete vehicle
  const result = await pool.query(
    `DELETE FROM vehicles WHERE id=$1 RETURNING *`,
    [vehicleId]
  );

  return result.rows[0];
};

//
export const vehicleService = {
  createVehicles,
  getAllVehicles,
  getSingleVehicles,
  updateVehicles,
  deleteVehicles,
};
