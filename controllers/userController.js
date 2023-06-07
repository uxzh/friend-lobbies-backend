class userController{
    static async getSingle(req, res, next){
        try{
            // get one user
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