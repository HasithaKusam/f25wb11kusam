exports.api = function (req, res) {
  res.json([{
    resource: "costumes",
    verbs: ["GET", "POST", "PUT", "DELETE"]
  }]);
};
