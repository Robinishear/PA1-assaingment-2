import { pool } from "../../config/db.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import config from "../../config/index.js";

const signup = async (payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);
  const isExist = pool.query(
    `  
     SELECT * FROM users WHERE email = $1 

    `,
    [email]
  );
  if ((await isExist).rows.length > 0) {
    throw new Error("Email already exists");
  }

  const result = await pool.query(
    `
    INSERT INTO users (name, email ,password, phone, role)
     VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
    [name, email, hashedPass, phone, role]
  );
  delete result.rows[0].password;
  return result.rows[0];
};

const signin = async (email: string, password: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE email= $1
    `,
    [email]
  );

  if (!result.rows.length) {
    throw new Error("Invalid email or password");
  }
  const user = result.rows[0];
  const isMatch = await bcrypt.compare(password as string, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = Jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.SECRET_JWT as string,
    { expiresIn: "7d" }
  );

  delete result.rows[0].password;
  return { token, user: result.rows };
};

export const authService = {
  signup,
  signin,
};
