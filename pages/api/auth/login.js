import cookie from "cookie";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "@/utils/db";

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5d" });

  return token;
};

const login = async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ msg: "Method's Not Allowed" });
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const passwordMatch = await bcrypt.compare(password, user.password);

  const token = generateToken(user.id);

  if (user && passwordMatch) {
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
  } else {
    res.status(400).json({ msg: "Incorrect Password or Email!" });
  }
};

export default login;
