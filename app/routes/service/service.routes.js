import express from "express";

import { Service } from "$app/controllers/index.js";

const router = express.Router();

router.get("/access/:id", Service.RE_GENERATE);
router.get("/analytics/:id", Service.MY_ANALYTICS);
router.get("/logs/:id", Service.MY_LOGS);

router.get("/", Service.IDS);
router.post("/", Service.CREATE);
router.get("/all/:id", Service.ALL);
router.get("/:id", Service.SINGLE);
router.delete("/:id", Service.DELETE);
router.patch("/:id", Service.UPDATE);

export default router;
