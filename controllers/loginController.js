class loginController{
    static async login(req, res, next){
        try{
            // login
        }catch(err){
            res.status(500).send(err)
        }
    }
}

module.exports = loginController