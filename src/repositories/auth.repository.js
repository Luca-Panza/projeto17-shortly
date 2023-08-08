import { db } from "../database/database.connection.js";

export async function createUserDB(name, email, encryptedPassword) {
  return db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, encryptedPassword]);
}

export function createSessionDB(userId, token) {
  return db.query(
      `INSERT INTO sessions ("userId", token) VALUES ($1, $2);`,
      [userId, token]
  )
}
