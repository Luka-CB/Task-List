import cookie from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@/utils/db";

const updateAccount = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ msg: "Method's Not Allowed!" });
  }

  const { username, email, password } = req.body;

  let hashedPassword;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 8);
  }

  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        password: true,
      },
    });

    const updatedUser = await prisma.user.update({
      where: {
        id: decoded.id,
      },
      data: {
        username,
        email,
        password: hashedPassword || user.password,
      },
    });

    if (updatedUser) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ msg: "Something Went Wrong!" });
    }
  } else {
    res.status().json({ msg: "Not Authorized!" });
  }
};

export default updateAccount;
