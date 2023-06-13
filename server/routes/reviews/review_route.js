const router = require("express").Router();

const { addReview } = require("../../controllers/review/review_controller");

router.post("/:agentId", addReview);

module.exports = router;
