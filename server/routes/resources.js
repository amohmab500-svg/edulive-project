const express = require("express");
const router = express.Router();

const {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} = require("../controllers/resourcesController");

router.get("/", getResources);
router.post("/", createResource);
router.put("/:id", updateResource);
router.delete("/:id", deleteResource);

module.exports = router;