
const search = async (req, res) => {
    const { collection, term } = req.params;
    res.json({
        collection,
        term
    })
}
module.exports = {
    search,
}