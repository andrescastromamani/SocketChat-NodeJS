
const getUsers = (req, res) => {
    const {nombre='not Name ', apellido} = req.query
    res.json({
        message: 'Hello from the server Controller get',
        nombre,
        apellido
    })
}
const postUsers = (req, res) => {
    const {nombre, apellido} = req.body

    res.json({
        message: 'Hello from the server Controller post',
        nombre,
        apellido
    })
}
const putUsers = (req, res) => {
    const id = req.params.id
    res.json({
        message: 'Hello from the server Controller put',
        id
    })
}
const deleteUsers = (req, res) => {
    res.json({
        message: 'Hello from the server Controller delete'
    })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    deleteUsers
}