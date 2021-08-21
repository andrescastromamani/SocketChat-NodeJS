
const { Product } = require('../models');

//Get All Categpries
const getProducts = async (req, res) => {
    const { limit = 10, from = 0 } = req.query
    const query = { status: true }
    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        products
    });
}

//Get Category by Id
const getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        .populate('user', 'name')
        .populate('category', 'name');
    res.json({
        product
    })
}

//Create Category
const createProduct = async (req, res) => {
    const { status, ...body } = req.body;
    const existProduct = await Product.findOne({ name: body.name });
    if (existProduct) {
        return res.status(400).json({
            message: 'Product already exist'
        });
    }
    //Generate Data
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }
    const product = new Product(data);
    product.save();
    res.status(201).json({
        product
    });
}

//Update Category
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { status, user, ...data } = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    res.json({
        product
    });
}

//Delete Category
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, { status: false });
    res.json({
        product
    });
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}