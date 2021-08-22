const { ObjectId } = require("mongoose").Types;
const { User, Category, Product } = require("../models");

const permitCollection = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUser = async (term = '', res) => {
    const mongoId = ObjectId.isValid(term);
    if (mongoId) {
        const user = await User.findById(term);
        res.json({
            results: (user) ? [user] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ status: true }]
    })
    res.json({
        results: users
    });
}
const searchCategory = async (term = '', res) => {
    const mongoId = ObjectId.isValid(term);
    if (mongoId) {
        const category = await Category.findById(term);
        res.json({
            results: (category) ? [category] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const category = await Category.find({ name: regex , status:true});
    res.json({
        results: category
    });
}
const searchProduct = async (term = '', res) => {
    const mongoId = ObjectId.isValid(term);
    if (mongoId) {
        const product = await Product.findById(term).populate('category', 'name');
        res.json({
            results: (product) ? [product] : []
        });
    }
    const regex = new RegExp(term, 'i');
    const products = await Product.find({ name: regex , status:true}).populate('category', 'name');
    res.json({
        results: products
    })
}

const search = async (req, res) => {
    const { collection, term } = req.params;
    if (!permitCollection.includes(collection)) {
        return res.status(400).json({
            message: `Collection permits is : ${permitCollection}`
        });
    }
    switch (collection) {
        case 'users':
            searchUser(term, res);
            break;
        case 'categories':
            searchCategory(term, res);
            break;
        case 'products':
            searchProduct(term, res);
            break;
        default:
            res.status(500).json({
                message: 'Error'
            });
    }
}
module.exports = {
    search,
    searchUser,
    searchCategory,
    searchProduct
}