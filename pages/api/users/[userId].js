import connectMongo from "../../../database/conn";
import { getUser, putUser, deleteUser } from "../../../database/controller";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Connection Error" })
  );
  const { method } = req;

  switch (method) {
    case "GET":
      await getUser(req, res);
      break;
    case "PUT":
      await putUser(req, res);
      break;
    case "DELETE":
      await deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}