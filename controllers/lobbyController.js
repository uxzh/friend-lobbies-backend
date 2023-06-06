class lobbyController{
    static async getById(req, res, next){
        try{
            // get lobby by id
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async getCategories(req, res, next){
        try{
            // get all existing categories
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async addLobby(req, res, next){
        try{
            // add a lobby
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async edit(req, res, next){
        try{
            // edit a lobby
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async delete(req, res, next){
        try{
            // delete a lobby
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async join(req, res, next){
        try{
            // join a lobby
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async leave(req, res, next){
        try{
            // leave a lobby
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async sendMessage(req, res, next){
        try{
            // send a message
        }catch(err){
            res.status(500).send(err)
        }
    }

    static async getMessages(req, res, next){
        try{
            // get all messages from a lobby
        }catch(err){
            res.status(500).send(err)
        }
    }

}

module.exports = lobbyController