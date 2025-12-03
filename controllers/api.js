exports.api = function (req, res) {
  res.send({
    resources: [
      {
        resource: "costumes",
        endpoints: [
          "GET /resource/costumes",
          "GET /resource/costumes/:id",
          "POST /resource/costumes",
          "PUT /resource/costumes/:id",
          "DELETE /resource/costumes/:id"
        ]
      }
    ]
  });
};
