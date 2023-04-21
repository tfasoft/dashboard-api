import express from "express";

import Activation from "$app/routes/activation/activation.routes.js";
import Payment from "$app/routes/payment/payment.routes.js";
import User from "$app/routes/user/user.routes.js";
import Auth from "$app/routes/auth/auth.routes.js";

const router = express.Router();

import { jwt } from "$app/middlewares/index.js";

router.use("/activation", Activation);
router.use("/payment", Payment);
router.use("/users", jwt, User);
router.use("/auth", Auth);

export default router;
