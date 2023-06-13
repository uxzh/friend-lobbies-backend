function validateSchema(schema){
    return async (req, res, next) => {
        try{
            const data = req.body;
            const validation = await schema.validate(data)
            return next()
        }catch(err){
            res.status(422).send(err.errors)
        }
    }
}

module.exports = {validateSchema}