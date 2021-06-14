import cookie from "cookie";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAccount = async (req, res) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ msg: "Method's Not Allowed!" });
  }

  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const tasks = prisma.task.deleteMany({
      where: {
        authorId: decoded.id,
      },
    });

    const user = prisma.user.delete({
      where: {
        id: decoded.id,
      },
    });

    const transaction = await prisma.$transaction([tasks, user]);

    if (transaction) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          expires: new Date(0),
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ msg: "Something went wrong!" });
    }
  } else {
    res.status(401).json({ msg: "Not Authorized" });
  }
};

export default deleteAccount;
