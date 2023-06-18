const {object, string, date} = require("yup")


const editLobbySchema = object({
    category: string().notRequired(),
    activity: string().notRequired(),
    location: string().notRequired(),
    date: date().notRequired(),
    capacity: string().notRequired(),
    name: string().notRequired()
})

module.exports = {editLobbySchema}