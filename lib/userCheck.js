const jwt = require('jsonwebtoken')

const openEndpoints = ['/login', '/signup', '/lobbies/random', '/lobbies/all']

userCheck = (req, res, next) => {
    if(openEndpoints.includes(req.url)){
        return next()
    }
    const {token} = req.cookies;
    if (!token) {
        return res.status(401).send('You are not logged in')
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userID = decoded._id
        return next()
    }catch(err){
        res.clearCookie('token')
        return res.status(401).send('Authentication failed, please log in again')
    }
}

module.exports = userCheck