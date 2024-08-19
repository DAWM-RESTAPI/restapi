const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const tokenAuth = require('../middleware/token_auth');

router.post('/items', tokenAuth, itemController.createItem);
router.get('/items', tokenAuth, itemController.getAllItems);
router.get('/items/:id', tokenAuth, itemController.getItem);
router.delete('/items/:id', tokenAuth, itemController.deleteItem);
router.put('/items/:id', tokenAuth, itemController.updateItem);

module.exports = router;
