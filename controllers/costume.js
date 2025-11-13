const Costume = require('../models/costume');

exports.costume_list = async function(req, res){
  try {
    const items = await Costume.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.costume_view_all_Page = async function(req, res){
  try {
    const items = await Costume.find();
    res.render('costumes', { title: 'Costume Search Results', results: items });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

exports.costume_detail = function(req, res){
  res.send('NOT IMPLEMENTED: Costume detail ' + req.params.id);
};

exports.costume_create_post = async function(req, res){
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

exports.costume_update_put = function(req, res){
  res.send('NOT IMPLEMENTED: PUT');
};

exports.costume_delete = function(req, res){
  res.send('NOT IMPLEMENTED: DELETE ' + req.params.id);
};
