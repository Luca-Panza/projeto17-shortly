import { db } from "../database/database.connection.js";

export async function getRanking(_, res) {
  try {
    const userListQuery = `
    SELECT
        u.id AS "id",
        u.name,
        COALESCE(SUM(url."visitCount"), 0) AS "visitCount",
        COALESCE(COUNT(url.id), 0) AS "linksCount"
    FROM
        users u
    LEFT JOIN
        sessions s ON u.id = s."userId"
    LEFT JOIN
        urls url ON u.id = url."userId"
    GROUP BY
        u.id, u.name
    ORDER BY
        "visitCount" DESC
    LIMIT
        10;
`;

    const userList = await db.query(userListQuery);

    const formattedUserList = userList.rows.map((user) => ({
      id: user.id,
      name: user.name,
      linksCount: user.linksCount,
      visitCount: user.visitCount,
    }));

    res.status(200).json(formattedUserList);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getUserMe(req, res) {
  const token = req.headers.authorization;

  try {
    const result = await db.query(
      `
    SELECT users."id" AS "userId",
      users.name,
      urls."id" AS "urlId",
      urls."shortUrl",
      urls."url",
      SUM(urls."visitCount") AS "totalVisitCount"
    FROM urls
    JOIN users ON users.id = urls."userId"
    JOIN sessions ON sessions."userId" = users.id
    WHERE sessions.token = $1
    GROUP BY users."id", users.name, urls."id", urls."shortUrl", urls."url"
    ORDER BY urls."id" ASC;
  `,
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({
        userId: null,
        name: null,
        visitCount: 0,
        shortenedUrls: [],
      });
    }

    let totalSum = 0;
    for (let i = 0; i < result.rows.length; i++) {
      const totalVisits = parseInt(result.rows[i].totalVisitCount, 10) || 0;
      totalSum += totalVisits;
    }

    const shortenedUrls = result.rows.map((row) => ({
      id: row.urlId,
      shortUrl: row.shortUrl,
      url: row.url,
      visitCount: parseInt(row.totalVisitCount, 10) || 0,
    }));

    res.status(200).json({
      userId: result.rows[0].userId,
      name: result.rows[0].name,
      visitCount: totalSum,
      shortenedUrls: shortenedUrls,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
