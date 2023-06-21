const UsersDAO = require('../DAO/users.dao')
const LobbiesDAO = require('../DAO/lobbies.dao')
const { v4: uuidv4 } = require('uuid');
const { cloudinaryUpload } = require('../lib/cloudinaryUpload')

class userController{
    static async getSingle(req, res, next){
        try{
            const user = await UsersDAO.getById(req.params.id);
            return res.ok(user);
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async update(req, res, next){
        try{
            const update = {...req.body};
            if(req.file){
                const picture = await cloudinaryUpload(req.file.path);
                fs.unlinkSync(req.file.path);
            }
            if(req.body.password){
                if(req.body.password != req.body.passwordConfirm){
                    return res.status(422).send("Passwords don't match")
                }
                const hashedpassword = await bcrypt.hash(req.body.password, 10)
                update.password = hashedpassword
                delete update.passwordConfirm
            }
            await UsersDAO.update(req.userID, update);
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

    static async acceptInvite(req, res, next){
        try{
            const user = await UsersDAO.getById(req.userID);
            const invites = user.invites;
            const invite = invites.find((invite) => invite._id == req.params.id);
            if (invite.type === "lobby"){
                await LobbiesDAO.joinLobby(invite.reference, req.userID);
                const newInvites = invites.filter((invite) => invite._id != req.params.id);
                await UsersDAO.update(req.userID, {invites: newInvites});
                res.ok("Joined lobby")
            }
            if(invite.type === "friend"){
                const friend = await UsersDAO.getById(invite.reference);
                const userFriends = user.friends;
                const friendFriends = friend.friends;
                const newUserFriends = userFriends.push(invite.reference);
                const newFriendFriends = friendFriends.push(req.userID);
                const newInvites = invites.filter((invite) => invite._id != req.params.id);
                await UsersDAO.update(req.userID, {friends: newUserFriends, invites: newInvites});
                await UsersDAO.update(invite.reference, {friends: newFriendFriends});
                return res.ok("Added friend")
            }
            else{
                return res.status(404).send("Invite not found")
            }
        }catch(err){
            res.status(500).send(err)
        }
    }

}

module.exports = userController