const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRETE_KEY, (error, user) => {
            if (error) res.status(403).json({ 'msg': 'Invalid access token' });
            req.user = user
            next()
        })
    } else {
        return res.status(401).json({ 'msg': "Unauthenticated" })
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json({ 'msg': 'You have no permissions to perform this action' })
        }
    })
}
module.exports = { verifyToken, verifyTokenAndAuthorization }

