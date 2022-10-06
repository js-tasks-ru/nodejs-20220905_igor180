const Product = require('../models/Product');
const mapProduct = require('../mappers/product');
const mongoose = require('mongoose');

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {

  const {subcategory} = ctx.query;

  if (!subcategory) return next();

  const products = await Product.find({subcategory: subcategory});

  ctx.body = {products: products.map(mapProduct)};

};

module.exports.productList = async function productList(ctx, next) {

  const products = await Product.find();

  ctx.body = {products: products.map(mapProduct)};

};

module.exports.productById = async function productById(ctx, next) {

  if (!mongoose.isValidObjectId(ctx.params.id)) {

    ctx.status = 400;
    ctx.body = 'неверный ИД';
    return next();

  }

  const product = await Product.findById(ctx.params.id);

  if (!product) {

    ctx.status = 404;
    ctx.body = 'товар не найден';
    return next();

  }

  ctx.body = {product: mapProduct(product)};
};