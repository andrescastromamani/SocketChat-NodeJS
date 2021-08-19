const { Category } = require('../models');
//Get Categpries
const getCategories = async (req, res) => {
    const { limit = 10, from = 0 } = req.query
    const query = { status: true }
    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        categories
    });
}
//Get Category by Id

//Create Category
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
//Update Category
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { _id, ...rest } = req.body;
    const category = await Category.findByIdAndUpdate(id, rest);
    res.json({
        category
    });
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory
}