const Costume = require("../models/costume");

exports.costume_view_all_Page = async function (req, res) {
  try {
    const results = await Costume.find();
    res.render("costumes", {
      title: "Costume Search Results",
      results: results,
    });
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

exports.costume_view_one_Page = async function (req, res) {
  try {
    const result = await Costume.findById(req.query.id);
    res.render("costumedetail", {
      title: "Costume Detail",
      toShow: result,
    });
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

exports.costume_create_Page = function (req, res) {
  res.render("costumecreate", {
    title: "Costume Create",
  });
};

exports.costume_create_post = async function (req, res) {
  console.log("Creating costume:", req.body);

  const cost = Number(req.body.cost);
  if (isNaN(cost) || cost < 10 || cost > 100) {
    return res
      .status(400)
      .send(`Validation error: cost (${req.body.cost}) must be between 10 and 100.`);
  }

  let document = new Costume({
    costume_type: req.body.costume_type,
    size: req.body.size,
    cost: cost,
  });

  try {
    let result = await document.save();
    res.send(result);
  } catch (err) {
    res.status(500).send(`Save error: ${err}`);
  }
};

exports.costume_update_Page = async function (req, res) {
  try {
    const result = await Costume.findById(req.query.id);
    res.render("costumeupdate", {
      title: "Update Costume",
      toShow: result,
    });
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

exports.costume_update_put = async function (req, res) {
  try {
    const updated = await Costume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.send(updated);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

exports.costume_delete_Page = async function (req, res) {
  try {
    const result = await Costume.findById(req.query.id);
    res.render("costumedelete", {
      title: "Delete Costume",
      toShow: result,
    });
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

exports.costume_delete = async function (req, res) {
  try {
    const deleted = await Costume.findByIdAndDelete(req.params.id);
    res.send(deleted);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};


exports.costume_list = async function (req, res) {
  try {
    const results = await Costume.find();
    res.send(results);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

exports.costume_detail = async function (req, res) {
  try {
    const result = await Costume.findById(req.params.id);
    res.send(result);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};
