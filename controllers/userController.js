const UsersDAO = require('../DAO/users.dao')
const { v4: uuidv4 } = require('uuid');

class userController{
    static async getSingle(req, res, next){
        try{
            const user = await UsersDAO.getById(req.userID);
            return res.ok(user);
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async update(req, res, next){
        try{
            update = await UsersDAO.update(req.userID, req.body);
            return res.ok("User updated")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async getByUsername(req, res, next){
        try{
            const user = UsersDAO.getByUsername(req.params.username);
            return res.ok(user);
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async ban(req, res, next){
        try{
            await UsersDAO.update(req.params.id, {isBanned: true});
            return res.ok("Banned user")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async mute(req, res, next){
        try{
            const user = await UsersDAO.getById(req.userID);
            const mutes = user.mutes;
            mutes.push({user:req.params.id, lobby: req.params.lobby});
            await UsersDAO.update(req.userID, {mutes});
            return res.ok("Muted user");
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async getAll(req, res, next){
        try{
            const users = await UsersDAO.getAll()
            return res.status(200).send(users)
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async saveLobby(req, res, next){
        try{
            const user = await UsersDAO.getById(req.userID);
            const saved = user.savedLobbies;
            saved.push(req.params.id);
            await UsersDAO.update(req.userID, {savedLobbies: saved});
            return res.ok("Saved lobby")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async unsaveLobby(req, res, next){
        try{
            const user = await UsersDAO.getById(req.userID);
            const saved = user.savedLobbies;
            const newSaved = saved.filter((lobby) => lobby != req.params.id);
            await UsersDAO.update(req.userID, {savedLobbies: newSaved});
            return res.ok("Unsaved lobby")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async removeFriend(req, res, next){
        try{
            const user = await UsersDAO.getById(req.userID);
            const friend = await UsersDAO.getById(req.params.id);
            const userFriends = user.friends;
            const friendFriends = friend.friends;
            const newUserFriends = userFriends.filter((friend) => friend != req.params.id);
            const newFriendFriends = friendFriends.filter((friend) => friend != req.userID);
            await UsersDAO.update(req.userID, {friends: newUserFriends});
            await UsersDAO.update(req.params.id, {friends: newFriendFriends});
            return res.ok("Removed friend")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async addInvite(req, res, next){
        try{
            const user = await UsersDAO.getById(req.params.id);
            const invites = user.invites;
            const _id = uuidv4();
            invites.push({...req.body, _id});
            await UsersDAO.update(req.params.id, {invites});
            return res.ok("Added invite")
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async removeInvite(req, res, next){
        try{
            const user = await UsersDAO.getById(req.userID);
            const invites = user.invites;
            const newInvites = invites.filter((invite) => invite._id != req.params.id);
            await UsersDAO.update(req.userID, {invites: newInvites});
            return res.ok("Removed invite")
        }catch(err){
            res.status(500).send(err)
        }
    }

}

module.exports = userController