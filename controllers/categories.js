const { Category } = require('../models');

const createCategory = async (req, res) => {
    const { name } = req.body;
    const existCategory = await Category.findOne({ name });
    if (existCategory) {
        return res.status(400).json({
            message: 'Category already exist'
        });
    }
    //Generate Data
    const data = {
        name,
        user: req.user._id
    }
    const category = new Category(data);
    category.save();
    res.status(201).json({
        message: 'Category created successfully'
    });
}
module.exports = {
    createCategory
}