import { db } from "../database/database.connection.js";

export async function storeUrl(session, url, urlShortId) {
  return await db.query(`INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3);`, [session, url, urlShortId]);
}

export async function findUrl(urlShortId) {
  return await db.query(`SELECT * FROM urls WHERE url=$1`, [urlShortId]);
}

export async function urlQuery(id) {
  return db.query(`SELECT id, url, "shortUrl" FROM urls WHERE id = $1`, [id]);
}

export async function incrementVisitCount(id, newVisitCount) {
  return await db.query(`UPDATE urls SET "visitCount" = $2 WHERE id = $1`, [id, newVisitCount]);
}

export async function getUrlByShortUrl(shortUrl) {
  return await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);
}

export async function getUrlById(id) {
  return await db.query(`SELECT * FROM urls WHERE id = $1`, [id]);
}

export async function deleteUrlById(id) {
  return await db.query(`DELETE FROM urls WHERE id=$1`, [id]);
}