const UsersDAO = require('../DAO/users.dao')
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

}

module.exports = userController