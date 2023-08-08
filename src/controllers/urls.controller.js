import { nanoid } from "nanoid";
import {
  createShortUrlDB,
  getUrlByIdDB,
  getUrlByNameDB,
  increaseViewsDB,
  getUrlUserByIdDB,
  deleteUrlDB,
} from "../repositories/urls.repository.js";

export async function postUrl(req, res) {
  const { url } = req.body;
  const { userId } = res.locals;
  const shortUrl = nanoid();

  try {
    const {
      rows: [result],
    } = await createShortUrlDB(url, shortUrl, userId);
    res.status(201).send(result);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;

  try {
    const url = await getUrlByIdDB(id);
    if (url.rowCount === 0) return res.status(404).send({ message: "Url not found" });

    res.status(200).send(url.rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const url = await getUrlByNameDB(shortUrl);
    if (url.rowCount === 0) return res.status(404).send({ message: "Url not found" });

    await increaseViewsDB(shortUrl);

    res.redirect(url.rows[0].url);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { userId } = res.locals;

  try {
    const url = await getUrlUserByIdDB(id);
    if (url.rowCount === 0) return res.status(404).send({ message: "Url not found" });
    if (url.rows[0].userId !== userId) return res.status(401).send({ message: "Unauthorized" });

    await deleteUrlDB(id);
    res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
