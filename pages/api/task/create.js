import prisma from "@/utils/db";
import cookie from "cookie";
import jwt from "jsonwebtoken";

const createTask = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ msg: "Method's Not Allowed!" });
  }

  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newTask = await prisma.task.create({
      data: {
        title: req.body.title,
        author: {
          connect: {
            id: decoded.id,
          },
        },
      },
    });

    if (!newTask) {
      res.status(400).json("Create Task Fail");
    } else {
      res.status(200).json({ msg: "Task Created Successfully!" });
    }
  } else {
    res.status(401).json({ msg: "Not Authorized!" });
  }
};

export default createTask;
