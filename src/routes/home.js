import express from "express";
const router = express.Router();

// Home page route.
router.get("/", function (req, res) {
    res.send("Hello Getir");
});

export default router