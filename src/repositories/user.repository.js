import { db } from "../database/database.connection.js";

export async function userQueryByEmail(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}
