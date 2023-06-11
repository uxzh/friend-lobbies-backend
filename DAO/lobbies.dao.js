class LobbiesDAO{
    static lobbies

    static async injectDB(db){
        try{
            this.lobbies = await db.collection("lobbies")
        }catch(err){
            throw(err)
        }
    }

    // DB functions added here
}

module.exports = LobbiesDAO