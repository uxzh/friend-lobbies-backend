const {MongoClient} = require('mongodb')
require('dotenv').config({path: `.env.${process.env.ENV_PATH}`})

const client = new MongoClient(process.env.MONGO_URL)

async function main(){
    try{
        await client.connect()
        console.log("Connected to DB")
        const db = client.db('friend-lobbies')
        await LobbiesDAO.injectDB(db)
        await UsersDAO.injectDB(db)
        
        app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}`)
        })
    }catch(err){
        console.error(err)
    }
}