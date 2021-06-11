import prisma from "@/utils/db";

// import {PrismaClient} from '@prisma/client'
// const prisma = new PrismaClient()

const clearList = async (req, res) => {
  if (req.method !== "DELETE") {
    res.status(405).json({ msg: "Method's Not Allowed!" });
  }

  if (req.headers.cookie) {
    const deleteList = await prisma.task.deleteMany({});

    if (!deleteList) {
      res.status(404).json({ msg: "There was a problem" });
    } else {
      res.status(200).json({ success: true });
    }
  } else {
    res.status(401).json({ msg: "Not Authorized!" });
  }
};

export default clearList;
