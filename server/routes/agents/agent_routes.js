const router = require("express").Router();

const {
  allAgents,
  addAgent,
  singleAgent,
} = require("../../controllers/agents/agent_controller");

router.route("/").get(allAgents).post(addAgent);

router.get("/:agentId", singleAgent);

module.exports = router;
