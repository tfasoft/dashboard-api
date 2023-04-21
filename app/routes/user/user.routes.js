import express from "express";

import { User } from "$app/controllers/index.js";

const router = express.Router();

router.patch("/password/:id", User.PASSWORD);
router.get("/access/:id", User.RE_GENERATE);

router.get("/:id", User.SINGLE);
router.delete("/:id", User.DELETE);
router.patch("/:id", User.UPDATE);

export default router;
