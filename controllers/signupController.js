const fs = require('fs')
const {cloudinaryUpload} = require('../lib/cloudinaryUpload')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const UsersDAO = require('../DAO/users.dao')
const jwt = require('jsonwebtoken')

class signupController{
    static async signup(req, res, next){
        try{
            let picture
            if(req.file){
                const url = await cloudinaryUpload(req.file.path);
                fs.unlinkSync(req.file.path);
                picture = url
            }
            else{
                picture = "https://res.cloudinary.com/denzwvfde/image/upload/v1686088141/user_pzj7gl.png"
            }
            const hashedpassword = await bcrypt.hash(req.body.password, 10)
            const {firstName, lastName, email, username, phone, interests} = req.body
            const _id = uuidv4()
            UsersDAO.addUser({firstName, lastName, email, username, phone, interests, _id, password:hashedpassword, picture, mutes:[], savedLobbies:[], friends:[], invites:[]})
            const token = await jwt.sign({_id, firstName, lastName, picture, interests}, process.env.JWT_SECRET, {expiresIn: "3h"})
            res.cookie("token", token, {sameSite: 'none', secure: true})
            res.status(201).send(token)
        }catch(err){
            res.status(500).send(err.message)
        }
    }

    static async signupCheck(req, res, next){
        try{
            const username = await UsersDAO.getByUsername(req.body.username)
            const email = await UsersDAO.getByEmail(req.body.email)
            if (req.body.password != req.body.passwordConfirm){
                return res.status(422).send("Passwords must match")
            }
            if(username){
                return res.status(409).send("A user with this username already exists")
            }
            if(email){
                return res.status(409).send("A user with this email address already exists")
            }
            return next()
        }catch(err){
            return res.status(500).send(err)
        }
    }
}

module.exports = signupController