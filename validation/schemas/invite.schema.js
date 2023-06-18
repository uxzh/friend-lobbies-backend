const {object, string, setLocale, array} = require("yup")


const inviteSchema = object({
    type: string().required().matches(/(^friend$)|(^lobby$)/),
    reference: string().required()
})

module.exports = {inviteSchema}