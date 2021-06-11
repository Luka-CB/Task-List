import jwt from "jsonwebtoken";
import cookie from "cookie";
import bcrypt from "bcrypt";
import prisma from "@/utils/db";

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });

  return token;
};

const register = async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ msg: "Method's Not Allowed!" });
  }

  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 8);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  if (!newUser) {
    res.status(400).json({ msg: "Create User Fail!" });
  }

  const token = generateToken(newUser.id);

  if (newUser) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "strict",
        path: "/",
      })
    );

    res.status(200).json({ success: true });
  }
};

export default register;
