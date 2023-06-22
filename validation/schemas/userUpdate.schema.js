const {object, string, setLocale, array} = require("yup")

setLocale(
    {string: {
        matches: "Phone must match a valid phone number including country code"
    }}
)

const userUpdateSchema = object({
    email: string().notRequired(),
    password: string().notRequired(),
    passwordConfirm: string().notRequired(),
    firstName: string().notRequired(),
    lastName: string().notRequired(),
    phone: string().matches(/[0-9]{1,3}[0-9]{8,11}/).notRequired(),
    username: string().notRequired(),
    interests: array().min(1).notRequired(), 
    bio: string().notRequired()
})

module.exports = {userUpdateSchema}