const { Agent, Review } = require("../../model");

exports.allAgents = async (req, res, next) => {
  try {
    const agents = await Agent.findAll();
    return res.json(agents);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.addAgent = async (req, res, next) => {
  try {
    const agent = await Agent.create(req.body);
    return res.status(201).json(agent);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.singleAgent = async (req, res, next) => {
  try {
    const { agentId } = req.params;

    const agent = await Agent.findByPk(agentId, {
      include: [{ model: Review, as: "reviews" }],
    });

    if (!agent) return res.status(404).json({ error: "Agent not found" });

    return res.status(200).json(agent);
  } catch (error) {
    console.log("error", error);
    return res.status(400).json(error);
  }
};
