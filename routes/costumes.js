const express = require('express');
const router = express.Router();
const costume_controller = require('../controllers/costume');

router.get('/', costume_controller.costume_view_all_Page);

module.exports = router;
