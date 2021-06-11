import prisma from "@/utils/db";

const update = async (req, res) => {
  if (req.method !== "PUT") {
    res.status(405).json({ msg: "Method's Not Allowed!" });
  }

  if (req.headers.cookie) {
    const updateLi = await prisma.task.update({
      where: {
        id: req.query.list_id,
      },
      data: {
        title: req.body.title,
      },
    });

    if (!updateLi) {
      res.status(404).json({ msg: "There was a problem" });
    } else {
      res.status(200).json({ msg: "Success!" });
    }
  } else {
    res.status(401).json({ msg: "Not Authorized!" });
  }
};

export default update;
