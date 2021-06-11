import cookie from "cookie";
import jwt from "jsonwebtoken";
import prisma from "@/utils/db";

const user = async (req, res) => {
  if (req.method !== "GET") {
    res.status(400).json({ msg: "Method's Not Allowed" });
  }

  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "User Doesn't Exist!" });
    }
  } else {
    res.status(401).json({});
  }
};

export default user;
