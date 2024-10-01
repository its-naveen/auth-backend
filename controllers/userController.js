import { readData } from "../utils/helper.js";

export async function getUsers(req, res) {
  const users = await readData();
  res.status(200).json({ data: users });
}
