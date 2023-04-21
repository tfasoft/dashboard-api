import express from "express";

import { Activation } from "$app/controllers/index.js";

const router = express.Router();

router.post("/send", Activation.SEND_AGAIN);
router.get("/:activate_token", Activation.ACTIVATE);

export default router;
