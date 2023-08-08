import { getCompleteUserDB, getRankingDB } from "../repositories/user.repository.js";

export async function getCurrentUser(_, res) {
  const { userId } = res.locals;

  try {
    const {
      rows: [user],
    } = await getCompleteUserDB(userId);
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function getRanking(_, res) {
  try {
    const { rows: ranking } = await getRankingDB();
    res.send(ranking);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
