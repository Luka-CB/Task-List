import prisma from "@/utils/db";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const getTasks = async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ msg: "Method's Not Allowed!" });
  }

  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const tasks = await prisma.task.findMany({
      where: {
        authorId: decoded.id,
      },
    });

    if (!tasks) {
      res.status(404).json({ msg: "Tasks Not Found!" });
    } else {
      res.status(200).json(tasks);
    }
  } else {
    res.status(401).json({ msg: "Not Authorized!" });
  }
};

export default getTasks;
