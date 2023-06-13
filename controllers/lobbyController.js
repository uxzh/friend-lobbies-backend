const LobbiesDAO = require("../DAO/lobbies.dao")
const unsplash = require('../lib/unsplash')
const { v4: uuidv4 } = require('uuid');

class lobbyController{
    static async getById(req, res, next){
        try{
            const lobby = LobbiesDAO.getById(Number(req.params.id))
            if(lobby){
                res.ok(lobby)
            }else{
                res.status(404).send("Lobby not found")
            }
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async getCategories(req, res, next){
        try{
            const categories = LobbiesDAO.getCategories()
            res.ok(categories)
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async addLobby(req, res, next){
        try{
            const {category, activity, location, date, capacity} = req.body
            const users = [req.userID]
            const img = await unsplash.photos.getRandom({query: activity})
            const defaultPicture = img.response.urls.regular
            const _id = uuidv4()
            let pictures = []
            if (req.files){
                req.files.forEach(async (file) => {
                    const url = await cloudinaryUpload(req.file.path);
                    fs.unlinkSync(req.file.path);
                    pictures.push(url)
                })
            }
            const add = await LobbiesDAO.addLobby({category, activity, location, date, capacity, users, pictures, defaultPicture, _id, messages:[]})
            res.ok("Lobby created")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async editLobby(req, res, next){
        try{
            const {category, activity, location, date, capacity, _id, pictures} = req.body
            const lobby = await LobbiesDAO.getById(Number(_id))
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
            res.ok("Lobby edited")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async delete(req, res, next){
        try{
            const del = await LobbiesDAO.deleteLobby(Number(req.params.id))
            res.ok("Lobby deleted")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async join(req, res, next){
        try{
            const join = await LobbiesDAO.joinLobby(Number(req.params.id), req.userID)
            res.ok("Joined lobby")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async leave(req, res, next){
        try{
            const leave = await LobbiesDAO.leaveLobby(Number(req.params.id), req.userID)
            res.ok("Left lobby")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async sendMessage(req, res, next){
        try{
            const message = await LobbiesDAO.sendMessage(Number(req.params.id), req.userID, req.body.message)
            res.ok("Message sent")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async getMessages(req, res, next){
        try{
            const messages = await LobbiesDAO.getMessages(Number(req.params.id), req.userID)
            res.ok(messages)
        }catch(err){
            res.status(500).send(err)
        }
    }

}

module.exports = lobbyController