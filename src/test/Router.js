import express from "express";

const router = express.Router();


router.post("/create", authmiddleware.auth, postControllers.postcreate);

router.get("/", postControllers.postLooks);

export default router;
