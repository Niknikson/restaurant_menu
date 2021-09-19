const validation = (schema) => async (req, res, next) => {
    const body = req.body
    try {
        await schema.validate(body)
        next()
    } catch (e) {
        return res.status(422).json(e.message)
    }
}

module.exports = validation