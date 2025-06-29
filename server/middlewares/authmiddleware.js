import { clerkClient } from "@clerk/express";

//Middleware (Protect Educator Route)
export const protectEducator = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const user = await clerkClient.users.getUser(userId);
    if (user.publicMetadata.role !== "educator") {
      return res.status(401).send("Unauthorized");
    }
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
};
