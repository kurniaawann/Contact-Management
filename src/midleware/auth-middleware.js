import { prismaClient } from "../aplication/database.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");
  //tidak ada token maka kasih response 401
  if (!token) {
    console.log(!token);
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    //mengambil token dari database
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
    });
    //user tidak ada

    if (!user) {
      console.log(!user);
      res.status(401).json({
        error: "Unauthorized",
      });
    } else {
      req.user = user;
      next();
    }
  }
};
