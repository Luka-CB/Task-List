import cookie from "cookie";

const logout = async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ msg: "Method's Not Allowed" });
  }

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

  res.status(200).json({ msg: "logout" });
};

export default logout;
