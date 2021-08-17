
const verifyAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(500).json({
            message: 'can not verify token after the role'
        });
    }
    const {role, name} = req.user;
    if (role !== 'admin') {
        return res.status(401).json({
            message: `${name} his role is not Admin`
        });
    }
    next();
}

module.exports = verifyAdminRole;