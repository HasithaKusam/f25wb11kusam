var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var costume_controller = require('../controllers/costume');

/// API ROUTE
router.get('/', api_controller.api);

/// COSTUME ROUTES (API STYLE)

// GET list of all costumes
router.get('/costumes', costume_controller.costume_list);

// GET a single costume by ID
router.get('/costumes/:id', costume_controller.costume_detail);

// POST create costume
router.post('/costumes', costume_controller.costume_create_post);

// PUT update costume by ID
router.put('/costumes/:id', costume_controller.costume_update_put);

// DELETE costume by ID
router.delete('/costumes/:id', costume_controller.costume_delete);

module.exports = router;
