
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

const validateRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(500).json({
                message: 'can not verify token after the role'
            });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                message: `the use not has the roles ${roles}`
            });
        }
        next();
    }
}

module.exports = {
    verifyAdminRole,
    validateRole
}