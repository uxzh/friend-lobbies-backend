const UsersDAO = require('../DAO/users.dao')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class loginController{
    static async login(req, res, next){
        try{
            const {email, password, username} = req.body
            if (!email && !username){
                return res.status(422).send("Please provide email or username")
            }else if (!password){
                return res.status(422).send("Please provide password")
            }
            if (email){
                const user = await UsersDAO.getByEmail(email)
                if (!user){
                    return res.status(404).send("User not found")
                }
                const match = await bcrypt.compare(password, user.password)
                if (!match){
                    return res.status(401).send("Password incorrect")
                }
                const {firstName, lastName, picture, _id, interests} = user
                const token = await jwt.sign({_id, firstName, lastName, picture, interests}, process.env.JWT_SECRET, {expiresIn: "3h"})
                res.cookie("token", token, {sameSite: 'none', secure: true})
                return res.ok(token)

            }else if (username){
                const user = await UsersDAO.getByUsername(username)
                if (!user){
                    return res.status(404).send("User not found")
                }
                const match = await bcrypt.compare(password, user.password)
                if (!match){
                    return res.status(401).send("Password incorrect")
                }
                const {firstName, lastName, picture, _id, interests} = user
                const token = jwt.sign({_id, firstName, lastName, picture, interests}, process.env.JWT_SECRET, {expiresIn: "3h"})
                res.cookie("token", token, {sameSite: 'none', secure: true})
                return res.ok(token)
            }
        }catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    }
}

module.exports = loginController