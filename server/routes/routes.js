const router = require("express").Router();

const agentRoutes = require("./agents/agent_routes");
const reviewRoutes = require("./reviews/review_route");

router.use("/agents", agentRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
