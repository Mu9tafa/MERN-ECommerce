const express = require('express');
const router = new express.Router();

const {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productsController');

router.route('/products').get(getProducts);
router.route('/product/:id').get(getProduct);
router.route('/admin/product/new').post(addProduct);
router.route('/admin/product/:id').put(updateProduct).delete(deleteProduct);

module.exports = router;
