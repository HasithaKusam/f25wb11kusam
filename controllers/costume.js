const Costume = require('../models/costume');

exports.costume_list = async function(req, res) {
  try {
    const items = await Costume.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.costume_view_all_Page = async function(req, res) {
  try {
    const items = await Costume.find();
    res.render('costumes', { title: 'Costume Search Results', results: items });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

exports.costume_detail = async function(req, res) {
  console.log("costume_detail id:", req.params.id);
  try {
    const result = await Costume.findById(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ error: `document for id ${req.params.id} not found` });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.costume_create_post = async function(req, res) {
  try {
    const doc = new Costume({
      costume_type: req.body.costume_type,
      size: req.body.size,
      cost: req.body.cost
    });
    let result = await doc.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.costume_update_put = async function(req, res) {
  console.log("costume_update_put id:", req.params.id, "body:", req.body);
  try {
    let toUpdate = await Costume.findById(req.params.id);

    if (!toUpdate) {
      return res
        .status(404)
        .json({ error: `document for id ${req.params.id} not found` });
    }

    if (req.body.costume_type !== undefined) {
      toUpdate.costume_type = req.body.costume_type;
    }
    if (req.body.size !== undefined) {
      toUpdate.size = req.body.size;
    }
    if (req.body.cost !== undefined) {
      toUpdate.cost = req.body.cost;
    }

    const result = await toUpdate.save();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.costume_delete = async function(req, res) {
  console.log("costume_delete id:", req.params.id);
  try {
    const result = await Costume.findByIdAndDelete(req.params.id);
    if (!result) {
      return res
        .status(404)
        .json({ error: `document for id ${req.params.id} not found` });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
