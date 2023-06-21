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
                const {firstName, lastName, picture, _id, interests, username} = user
                const token = await jwt.sign({_id, firstName, lastName, picture, interests, username}, process.env.JWT_SECRET, {expiresIn: "3h"})
                res.cookie("token", token, {sameSite: 'none', secure: true})
                return res.ok(token)
            }if(username){
                const user = await UsersDAO.getByUsername(username)
                if (!user){
                    return res.status(404).send("User not found")
                }
                const match = await bcrypt.compare(password, user.password)
                if (!match){
                    return res.status(401).send("Password incorrect")
                }
                const {firstName, lastName, picture, _id, interests} = user
                const token = jwt.sign({_id, firstName, lastName, picture, interests, username}, process.env.JWT_SECRET, {expiresIn: "3h"})
                res.cookie("token", token, {sameSite: 'none', secure: true})
                return res.ok(token)
            }
        }catch(err){
            console.log(err)
            res.status(500).send(err)
        }
    }

    static async forgotPassword(req, res, next){
        try{
            const {email, username, password} = req.body
            if(!email || !username){
                return res.status(422).send("Please provide email and username")
            }
            const user = await UsersDAO.getByEmail(email)
            if (user.username !== username){
                return res.status(401).send("Username and email do not match")
            }
            else{
                const hashedpassword = await bcrypt.hash(password, 10)
                await UsersDAO.update(user._id, {password: hashedpassword})
                return res.status(200).send("Password updated")
            }
        }catch(err){
            res.status(500).send(err)
        }
    }
}

module.exports = loginController