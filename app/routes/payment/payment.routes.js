import express from "express";

import { Payment } from "$app/controllers/index.js";

const router = express.Router();

router.post("/request", Payment.REQUEST);
router.get("/verify", Payment.VERIFY);

export default router;
