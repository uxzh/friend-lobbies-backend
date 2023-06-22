const LobbiesDAO = require("../DAO/lobbies.dao")
const UsersDAO = require("../DAO/users.dao")
const unsplash = require('../lib/unsplash')
const { v4: uuidv4 } = require('uuid');
const categories = require('../lib/categories');
const cloudinaryUpload = require('../lib/cloudinaryUpload')
const fs = require('fs');

class lobbyController{

    static async getById(req, res, next){
        try{
            const lobby = await LobbiesDAO.getById(req.params.id)
            if(lobby){
                return res.ok(lobby)
            }else{
                return res.status(404).send("Lobby not found")
            }
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async getCategories(req, res, next){
        try{
            return res.ok(categories)
        }catch(err){
            return res.status(500).send(err)
        }
    }

    

    static async addLobby(req, res, next){
        try{
            const {category, location, date, capacity, name, description} = req.body
            const users = [req.userID]
            const img = await unsplash.photos.getRandom({query: category})
            const defaultPicture = img.response.urls.regular
            const _id = uuidv4()
            let pictures = []
            if (req.files){
                for (const file of req.files){
                    const url = await cloudinaryUpload(file.path);
                    console.log(url)
                    fs.unlinkSync(file.path);
                    pictures.push(url)
                }
            }
            const add = await LobbiesDAO.addLobby({category, name, description, location, date, capacity, users: [req.userID], pictures, defaultPicture, _id, messages:[], admins: [req.userID], waitList: []})
            return res.ok("Lobby created")
        }catch(err){
            console.log(err)
            return res.status(500).send(err)
        }
    }

    static async editLobby(req, res, next){
        try{
            const {category, activity, location, date, capacity, _id, pictures} = req.body
            const lobby = await LobbiesDAO.getById(_id)
            if(!lobby){
                return res.status(404).send("Lobby not found")
            }
            if(activity != lobby.activity){
                const img = await unsplash.photos.getRandom({query: activity})
                const defaultPicture = img.response.urls.regular
                const edit = await LobbiesDAO.editLobby(lobby._id, {defaultPicture})
            }
            if (req.files){
                req.files.forEach(async (file) => {
                    const url = await cloudinaryUpload(req.file.path);
                    fs.unlinkSync(req.file.path);
                    pictures.push(url)
                })
            }
            const edit = await LobbiesDAO.editLobby(lobby._id, {category, activity, location, date, capacity, pictures})
            return res.ok("Lobby edited")
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async delete(req, res, next){
        try{
            const del = await LobbiesDAO.deleteLobby(req.params.id)
            return res.ok("Lobby deleted")
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async join(req, res, next){
        try{
            const join = await LobbiesDAO.joinLobby(req.params.id, req.userID)
            return res.ok("Joined lobby")
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async leave(req, res, next){
        try{
            const leave = await LobbiesDAO.leaveLobby(req.params.id, req.userID)
            return res.ok("Left lobby")
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async sendMessage(req, res, next){
        try{
            const message = await LobbiesDAO.sendMessage(req.params.id, req.userID, req.body.message)
            return res.ok("Message sent")
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async getMessages(req, res, next){
        try{
            const messages = await LobbiesDAO.getMessages(req.params.id, req.userID)
            return res.ok(messages)
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async addAdmin(req, res, next){
        try{ 
            const lobby = await LobbiesDAO.getById(req.params.lobby)
            const admins = lobby.admins
            if (!(req.userID in admins || req.isAdmin)){
                return res.status(401).send("Unauthorized")
            }
            admins.push(req.params.id)
            const add = await LobbiesDAO.editLobby(lobby._id, {admins})
            return res.ok("Added admin")
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async removeAdmin(req, res, next){
        try{ 
            const lobby = await LobbiesDAO.getById(req.params.lobby)
            const admins = lobby.admins
            if (!(req.userID in admins || req.isAdmin)){
                return res.status(401).send("Unauthorized")
            }
            const newAdmins = admins.filter((admin) => admin != req.params.id)
            if(newAdmins.length === 0){
                return res.status(400).send("Cannot remove last admin")
            }
            const add = await LobbiesDAO.editLobby(lobby._id, {admins: newAdmins})
            return res.ok("Added admin")
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async kick(req, res, next){
        try{ 
            const lobby = await LobbiesDAO.getById(req.params.lobby)
            const users = lobby.users
            if (!(req.userID in admins || req.isAdmin)){
                return res.status(401).send("Unauthorized")
            }
            const newUsers = users.filter((user) => user != req.params.id)
            if(newUsers.length === 0){
                return res.status(400).send("Cannot remove last user")
            }
            const add = await LobbiesDAO.editLobby(lobby._id, {users: newUsers})
            return res.ok("User kicked")
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async wait(req, res, next){
        try{
            const lobby = await LobbiesDAO.getById(req.params.id)
            const waitList = lobby.waitList
            if(!waitList.includes(req.userID)){
                waitList.push(req.userID)
            }
            await LobbiesDAO.editLobby(lobby._id, {waitList})
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async unwait(req, res, next){
        try{
            const lobby = await LobbiesDAO.getById(req.params.id)
            const waitList = lobby.waitList
            const newWaitList = waitList.filter((user) => user != req.userID)
            await LobbiesDAO.editLobby(lobby._id, {waitList: newWaitList})
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async search(req, res, next){
        try{
            const lobbies = await LobbiesDAO.search(category, activity, location, date, capacity)
            return res.ok(lobbies)
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async getUsers(req, res, next){
        try{
            const lobby = await LobbiesDAO.getById(req.params.id)
            const users = lobby.users
            const usersToSend = []
            for (const user of users){
                const userToSend = await UsersDAO.getById(user)
                const {username, picture} = userToSend
                usersToSend.push({username, picture})
            }
            return res.ok(usersToSend)
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async getInterests(req, res, next){
        try{
            const user = await UsersDAO.getById(req.userID)
            const interests = user.interests
            const lobbies = await LobbiesDAO.getByInterest(interests)
            return res.ok(lobbies)
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async getNotInterests(req, res, next){
        try{
            const user = await UsersDAO.getById(req.userID)
            const interests = user.interests
            const lobbies = await LobbiesDAO.getByNotInterest(interests)
            return res.ok(lobbies)
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async getRandom(req, res, next){
        try{
            const lobbies = await LobbiesDAO.getRandom(20)
            return res.ok(lobbies)
        }catch(err){
            return res.status(500).send(err)
        }
    }

    static async getAll(req, res, next){
        try{
            const lobbies = await LobbiesDAO.search()
            return res.ok(lobbies)
        }catch(err){
            return res.status(500).send(err)
        }
    }

}

module.exports = lobbyController