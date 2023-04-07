import express from "express";

import User from "$app/routes/user/user.routes.js";
import Auth from "$app/routes/auth/auth.routes.js";

const router = express.Router();

import { jwt } from "$app/middlewares/index.js";

router.use("/users", jwt, User);
router.use("/auth", Auth);

export default router;
