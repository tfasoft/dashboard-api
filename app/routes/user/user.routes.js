import express from "express";

import { User } from "$app/controllers/index.js";

const router = express.Router();

router.get("/analytics/:id", User.MY_ANALYTICS);
router.patch("/password/:id", User.PASSWORD);
router.get("/logs/:id", User.MY_LOGS);

router.get("/:id", User.SINGLE);
router.delete("/:id", User.DELETE);
router.patch("/:id", User.UPDATE);

export default router;
