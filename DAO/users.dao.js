class UsersDAO{
    static users

    static async injectDB(db){
        try{
            this.users = await db.collection("users")
        }catch(err){
            throw(err)
        }
    }

    static async addUser(user){
        try{
            this.users.insertOne(user)
        }catch(err){
            throw new Error(`Couldn't add user: ${err}`)
        }
    }

    static async getByEmail(email){
        try{
            const user = await this.users.findOne({email: email})
            return user
        }catch(err){
            throw new Error(`Couldn't find user: ${err}`)
        }
    }

    static async getByUsername(username){
        try{
            const user = await this.users.findOne({username: username})
            return user
        }catch(err){
            throw new Error(`Couldn't find user: ${err}`)
        }
    }
    
    static async getById(id){
        try{
            const user = await this.users.findOne({id: id})
            return user
        }catch(err){
            throw new Error(`Couldn't find user: ${err}`)
        }
    }

}

module.exports = UsersDAO