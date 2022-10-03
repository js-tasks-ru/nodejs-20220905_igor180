const category = require('../models/Category');
const mapCategory = require('../mappers/category');

module.exports.categoryList = async function categoryList(ctx, next) {
  
  const categories = await category.find();

  //ctx.body = {categories: []};
  ctx.body = {categories: categories.map(mapCategory)};
};
