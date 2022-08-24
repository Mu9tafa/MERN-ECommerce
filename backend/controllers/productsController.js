const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');

// add product => api/v1/product/new
const addProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).send({ success: true, message: product });
};

// get all products => api/v1/products
const getProducts = async (req, res, next) => {
  const products = await Product.find({});
  res.json({
    success: true,
    message: `Found ${products.length} products`,
    products,
  });
};

// get a single product => api/v1/product/{id}
const getProduct = async (req, res, next) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) {
    throw new ErrorHandler(404, 'Product not found');
  }
  res.json({
    success: true,
    message: `Found ${product.name}`,
    product,
  });
};

// update a single product => api/v1/admin/product/{id}
const updateProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    throw new ErrorHandler(404, 'Product not found');
  }
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({ updatedProduct: updatedProduct });
};

// delete a single product => api/v1/admin/product/{id}
const deleteProduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    throw new ErrorHandler(404, 'Product not found');
  }
  product = await Product.deleteOne({ _id: req.params.id });
  res.status(200).json(product);
};

module.exports = {
  getProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
