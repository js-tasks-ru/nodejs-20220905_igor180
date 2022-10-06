const mongoose = require('mongoose');
const connection = require('../libs/connection');

const subCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        //unique: 'Такая подкатегория уже существует',
    }
});

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        //unique: 'Такая категория уже существует',
    },

    subcategories: [subCategorySchema]
});

module.exports = connection.model('Category', categorySchema);
