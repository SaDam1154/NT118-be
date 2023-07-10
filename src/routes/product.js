const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:id', productController.readOne);
router.post('/:id/save', productController.save);
router.post('/:id/unsave', productController.unsave);
router.get('/:id/getSavePosts', productController.getSavedProducts);
router.post('/:id/favourite', productController.favourite);
router.post('/:id/unfavourite', productController.unfavourite);
router.get('/:id/getFavouritedProducts', productController.getFavouritedProducts);
router.get('/', productController.read);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.destroy);

module.exports = router;
