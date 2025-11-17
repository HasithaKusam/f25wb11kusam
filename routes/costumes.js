const express = require('express');
const router = express.Router();
const costume_controller = require('../controllers/costume');

router.get('/', costume_controller.costume_view_all_Page);

router.get('/detail', costume_controller.costume_view_one_Page);

router.get('/create', costume_controller.costume_create_Page);
router.post('/create', costume_controller.costume_create_post);

router.get('/update', costume_controller.costume_update_Page);
router.post('/update', costume_controller.costume_update_post);

router.get('/delete', costume_controller.costume_delete_Page);
router.post('/delete', costume_controller.costume_delete_post);

module.exports = router;
