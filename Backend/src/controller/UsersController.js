const knex = require("../database")
const crypto = require("crypto")


module.exports = {
    async create(request, response, next) {
        try {
            const {
                nome,
                sobrenome,
                usuario,
                email,
                senha
            } = request.body
            const id = crypto.randomBytes(4).toString("hex")
            await knex("users").insert({
                id,
                nome,
                sobrenome,
                usuario,
                email,
                senha
            })
            return response.status(201).send({id})
        } catch (error) {
            next(error)
        }

    },

    async index(request, response, next) {
        try {
            const users = await knex("users")
            return response.json(users)

        } catch (error) {
            next(error)
        }
    },
    
    async delete(request,response,next){
        try {
            const{id}=request.params
            
            await knex("users")
            .where({id})
            .del()
            return response.send()

        } catch (error) {
            next(error)
        }
    }

   

}

    