const {object, string, date} = require("yup")


const lobbySchema = object({
    category: string().required(),
    activity: string().required(),
    location: string().required(),
    date: date().required(),
    capacity: string().required(),
    name: string().required()
})

module.exports = {lobbySchema}