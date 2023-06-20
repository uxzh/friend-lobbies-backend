const UsersDAO = require('../DAO/users.dao')

const adminCheck = async (req, res, next) => {
    const user = await UsersDAO.getById(req.userID)
    if(user.isAdmin){
        return next()
    }else{
        return res.status(401).send("Unauthorized")
    }
}

module.exports = adminCheck