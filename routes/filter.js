import express from "express";
import controller from '../controller/filter'
const router = express.Router();


// Filter controller route.
router.post("/filter", function (req, res) {
  controller.filter(req, res);
});

export default router
