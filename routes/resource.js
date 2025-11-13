const express = require('express');
const router = express.Router();

const api_controller = require('../controllers/api');
const costume_controller = require('../controllers/costume');

router.get('/', api_controller.api);

router.get('/costumes', costume_controller.costume_list);

router.get('/costumes/:id', costume_controller.costume_detail);

router.post('/costumes', costume_controller.costume_create_post);

router.put('/costumes/:id', costume_controller.costume_update_put);

router.delete('/costumes/:id', costume_controller.costume_delete);

module.exports = router;
