const { Review, Agent } = require("../../model");

exports.addReview = async (req, res, next) => {
  const { agentId } = req.params;
  const { comment, name } = req.body;

  const agent = await Agent.findByPk(agentId);
  if (!agent) {
    return res.status(404).json({ error: "Agent not found" });
  }

  const review = await Review.create({ comment, agentId, name });
  return res.status(201).json(review);
};
