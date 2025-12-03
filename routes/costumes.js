var express = require('express');
var router = express.Router();

var costume_controller = require('../controllers/costume');

const secured = (req, res, next) => {
  if (req.user) return next();
  res.redirect("/login");
};

router.get('/', costume_controller.costume_view_all_Page);

router.get('/detail', costume_controller.costume_view_one_Page);

router.get('/create', secured, costume_controller.costume_create_Page);
router.post('/create', secured, costume_controller.costume_create_post);

router.get('/update', secured, costume_controller.costume_update_Page);
router.post('/update', secured, costume_controller.costume_update_put);

router.get('/delete', secured, costume_controller.costume_delete_Page);
router.post('/delete', secured, costume_controller.costume_delete);

module.exports = router;
