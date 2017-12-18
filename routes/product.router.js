const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.ctrl');

router.get('/', productCtrl.get);
router.post('/', productCtrl.save);
router.post('/delete/:id', productCtrl.delete);
router.get('/new', productCtrl.new);
router.get('/:id', productCtrl.getById);


module.exports = router;