const knex = require("../database/")

module.exports = {
    async create(request, response,next) {
        try{
        const {
            id
        } = request.body
            
        const user = await knex("users")
            .where("id", id)
            .select("nome","sobrenome")
            .first()

       

        if (!user) {
            return response.status(400).json({
                error: "No User found with this ID"
            })
        }
        return response.json(user)
    }catch(error){
        next(error)
    }
    }
}