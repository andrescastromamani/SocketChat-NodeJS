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
            results:(user) ? [user] : []
        });
    }else {
        res.json({
            message: 'Not found'
        });
    }
}

const search = async (req, res) => {
    const { collection, term } = req.params;
    if (!permitCollection.includes(collection)) {
        return res.status(400).json({
            message: `Collection permits ${permitCollection}`
        });
    }
    switch (collection) {
        case 'users':
            searchUser(term, res);
            break;
        case 'categories':
            break;
        case 'products':
            break;
        default:
            res.status(500).json({
                message: 'Error'
            });
    }
}
module.exports = {
    search,
    searchUser
}