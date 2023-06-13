const {object, string, setLocale, array} = require("yup")

setLocale(
    {string: {
        matches: "Phone must match a valid phone number including country code"
    }}
)

const signupSchema = object({
    email: string().required(),
    password: string().required(),
    passwordConfirm: string().required(),
    firstName: string().required(),
    lastName: string().required(),
    phone: string().matches(/[0-9]{1,3}[0-9]{8,11}/).required(),
    username: string().required(),
    interests: array().min(1).required()
})

module.exports = {signupSchema}