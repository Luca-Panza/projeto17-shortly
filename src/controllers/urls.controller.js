import { nanoid } from "nanoid";
import {
  storeUrl,
  findUrl,
  urlQuery,
  incrementVisitCount,
  getUrlByShortUrl,
  getUrlById,
  deleteUrlById,
} from "../repositories/urls.repository.js";

export async function postUrl(req, res) {
  const { url } = req.body;
  const session = res.locals;

  try {
    const shortUrlResponse = nanoid();

    await storeUrl(session.rows[0].userId, url, shortUrlResponse);

    const shortUrlExist = await findUrl(url);

    res.status(201).send({ id: shortUrlExist.rows[0].id, shortUrl: shortUrlExist.rows[0].shortUrl });
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function getUrl(req, res) {
  const { id } = req.params;

  try {
    const url = await urlQuery(id);
    if (url.rowCount === 0) return res.status(404).send({ message: "Url not found" });

    res.status(200).send(url.rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function redirectUrl(req, res) {
  const { shortUrl } = req.params;

  try {
    const result = await getUrlByShortUrl(shortUrl);
    if (result.rowCount === 0) return res.status(404).send({ message: "Url not found" });

    const { id, url, visitCount } = result.rows[0];

    const newVisitCount = visitCount + 1;

    await incrementVisitCount(id, newVisitCount);

    return res.redirect(url);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const session = res.locals;

  try {
    const idUrlQuery = await getUrlById(id);

    if (idUrlQuery.rowCount === 0) return res.status(404).send({ message: "Url not found" });

    if (idUrlQuery.rows[0].userId !== session.rows[0].userId) return res.status(401).send({ message: "Unauthorized" });

    await deleteUrlById(id, session);

    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
