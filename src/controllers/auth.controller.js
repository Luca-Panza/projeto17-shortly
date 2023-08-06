import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { userQuery } from "../repositories/user.repository.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await userQuery(email);
    if (user.rowCount > 0) return res.status(409).send({ message: "User already exists" });

    const encryptedPassword = bcrypt.hashSync(password, 10);
    await db.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3)", [name, email, encryptedPassword]);

    res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userQuery(email);
    if (user.rowCount === 0) return res.status(401).send({ message: "User not found" });

    const validPassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!validPassword) return res.status(401).send({ message: "Invalid password" });

    const token = uuidv4();

    await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, user.rows[0].id]);

    res.status(200).send({ token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
