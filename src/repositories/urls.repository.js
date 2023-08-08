import { db } from "../database/database.connection.js";

export function createShortUrlDB(url, shortUrl, userId) {
  return db.query(
    `INSERT INTO urls (url, "shortUrl", "userId") 
          VALUES ($1, $2, $3) 
          RETURNING id, "shortUrl"`,
    [url, shortUrl, userId]
  );
}

export async function getUrlByIdDB(id) {
  return db.query(`SELECT id, url, "shortUrl" FROM urls WHERE id = $1`, [id]);
}

export async function getUrlByShortUrl(shortUrl) {
  return db.query(`SELECT url FROM urls WHERE "shortUrl"=$1;`, [shortUrl]);
}

export function increaseViewsDB(shortUrl) {
  return db.query(`UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"=$1;`, [shortUrl]);
}

export function getUrlUserByIdDB(id) {
  return db.query(`SELECT "userId" FROM urls WHERE id=$1;`, [id]);
}

export async function deleteUrlDB(id) {
  return await db.query(`DELETE FROM urls WHERE id=$1`, [id]);
}
