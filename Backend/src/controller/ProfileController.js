const knex = require("../database")

module.exports = {
    
    async index(request,response,next){
        try{
        const user_id= request.headers.authorization
            
        const projects = await knex('post')
        .where("user_id",user_id)
        .select("*")
        return response.json(projects)
    }catch(error){
        next(error)
    }
}
}

