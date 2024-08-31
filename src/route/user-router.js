import express from "express";

import addresscontroller from "../controller/address_controller.js";
import contactController from "../controller/contact-controller.js";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../midleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

//userApi
userRouter.get("/api/users/current", userController.getUser);
userRouter.patch("/api/users/current", userController.updateUser);
userRouter.delete("/api/users/logout", userController.logout);

//contact Api
userRouter.post("/api/contacts", contactController.createContact);
userRouter.get("/api/contacts/:contactId", contactController.getContact);
userRouter.put("/api/contacts/:contactId", contactController.updateContact);
userRouter.delete("/api/contacts/:contactId", contactController.removeContact);
userRouter.get("/api/contacts", contactController.searchContactAPi);

//addressAPI
userRouter.post(
  "/api/contacts/:contactId/addresses",
  addresscontroller.createAddress
);
userRouter.get(
  "/api/contacts/:contactId/addresses/:addressId",
  addresscontroller.getAddress
);
userRouter.put(
  "/api/contacts/:contactId/addresses/:addressId",
  addresscontroller.updateAddress
);

userRouter.delete(
  "/api/contacts/:contactId/addresses/:addressId",
  addresscontroller.removeAddress
);
userRouter.get(
  "/api/contacts/:contactId/addresses",
  addresscontroller.listAddress
);

export { userRouter };
