const UsersDAO = require('../DAO/users.dao')
class userController{
    static async getSingle(req, res, next){
        try{
            //get user by what? im going to assume its ID, but also how do we get ID?
            const user = await UsersDAO.getById(req.body.id);
            return res.status(200).send(user);
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async update(req, res, next){
        try{
            // update the user
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async getByUsername(req, res, next){
        try{
            // get user by username
            const user = UsersDAO.getByUsername(req.body.userName);
            res.status(200).send(user);
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async ban(req, res, next){
        try{
            // ban a user (admin) for a duration
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async mute(req, res, next){
        try{
            // mute a user in a chat
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async getAll(req, res, next){
        try{
            // get all users (admin)
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async saveLobby(req, res, next){
        try{
            // save a lobby
        }catch(err){
            res.status(500).send(err)
        }
    }

}

module.exports = userController