import express from "express";
const router = express.Router();

/**
 * Index router
 * GET
 */
router.get("/", function (req, res) {
    res.send("Hello Getir");
});

export default router