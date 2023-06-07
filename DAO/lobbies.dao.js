class LobbiesDAO{
    static lobbies

    static async injectDB(db){
        try{
            lobbies = await db.collection("lobbies")
        }catch(err){
            throw(err)
        }
    }

    // DB functions added here
}
