const UsersDAO = require("./users.dao")

class LobbiesDAO{
    static lobbies

    static async injectDB(db){
        try{
            this.lobbies = await db.collection("lobbies")
        }catch(err){
            throw(err)
        }
    }

    static async getById(id){
        try{
            const lobby = await this.lobbies.findOne({_id: id})
            return lobby
        }catch(err){
            throw new Error(`Couldn't find lobby: ${err}`)
        }
    }

    static async getCategories(){
        try{
            const categories = await this.lobbies.distinct("category")
            return categories
        }catch(err){
            throw new Error(`Couldn't get categories: ${err}`)
        }
    }

    static async addLobby(lobby){
        try{
           await this.lobbies.insertOne(lobby)
        }catch(err){
            throw new Error(`Couldn't add lobby: ${err}`)
        }
    }

    static async editLobby(id, lobby){
        try{
            await this.lobbies.updateOne({_id: id}, {$set: lobby})
        }catch(err){
            throw new Error(`Couldn't edit lobby: ${err}`)
        }
    }

    static async deleteLobby(id){
        try{
            await this.lobbies.deleteOne({_id: id})
        }catch(err){
            throw new Error(`Couldn't delete lobby: ${err}`)
        }
    }

    static async joinLobby(LobbyID, userID){
        try{
            const lobby = await this.getById(LobbyID)
            const {users} = lobby
            await this.lobbies.updateOne({_id: LobbyID}, {$set: {users: [...users, userID]}})
        }catch(err){
            throw new Error(`Couldn't join lobby: ${err}`)
        }
    }

    static async leaveLobby(LobbyID, userID){
        try{
            const lobby = await this.getById(LobbyID)
            const {users} = lobby
            const newUsers = users.filter(user => user !== userID)
            await this.lobbies.updateOne({_id: LobbyID}, {$set: {users: newUsers}})
        }catch(err){
            throw new Error(`Couldn't leave lobby: ${err}`)
        }
    }

    static async sendMessage(LobbyID, userID, message){
        try{
            const lobby = await this.getById(LobbyID)
            const {messages} = lobby
            const time = Date().now()
            await this.lobbies.updateOne({_id: LobbyID}, {$set: {messages: [...messages, {userID, message, time}]}})
        }catch(err){
            throw new Error(`Couldn't send message: ${err}`)
        }
    }

    static async getMessages(LobbyID, userID){
        try{
            const lobby = await this.getById(LobbyID)
            const {messages} = lobby
            const user = await UsersDAO.getById(userID)
            const {muted} = user
            const filteredMessages = messages.filter(message => !muted.includes(message.userID))
            return filteredMessages
        }catch(err){
            throw new Error(`Couldn't get messages: ${err}`)
        }
    }

}

module.exports = LobbiesDAO