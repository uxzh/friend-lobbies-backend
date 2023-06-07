class UsersDAO{
    static users

    static async injectDB(db){
        try{
            lobbies = await db.collection("users")
        }catch(err){
            throw(err)
        }
    }

    // DB functions added here
}