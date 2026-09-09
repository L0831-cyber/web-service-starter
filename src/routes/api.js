const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// Items endpoints
router.get('/items', itemsController.list);
router.post('/items', itemsController.create);
router.get('/items/:id', itemsController.get);
router.put('/items/:id', itemsController.update);
router.delete('/items/:id', itemsController.delete);

module.exports = router;
