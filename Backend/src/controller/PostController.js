const knex = require("../database")
const crypto = require("crypto")
const { Socket } = require("dgram")
const { isObject } = require("util")
const  io = require('socket.io')(3001)



module.exports={
    async create(request, response, next) {
        try {
            const{
                legenda,
                user_id,
                name,
            
            }=request.body
            
            var url = request.headers.authorization

            if(url==="[object Object]"){
                url=null
            }
        
        
            await knex("post").insert({
                legenda,
                user_id,
                name,
                url
            })
           
                
            io.emit('refresh',"emitiu")
          
            return response.status(201).send()
                
           

        }catch (error) {
            next(error)
        }

    },

    async index(request, response, next) {
        try {
            
           
            const projects = await knex("post")
            
          
            
            return response.send(projects)

        } catch (error) {
            next(error)
        }
    },

    async delete(request,response,next){
        try {

            const{ProjectId}=request.params
            const user_id= request.headers.authorization
           
            const post = await knex("post")
            .where("ProjectId",ProjectId)
            .select("user_id")
            .first()

            if(post.user_id!==user_id){
                return response.send()
            }
            await knex("post").where("ProjectId",ProjectId).delete()
            io.emit('refresh',"emitiu")
            response.send()

        } catch (error) {
            next(error)
        }
    },

    async update(request,response,next){
        try {
            const {legenda} = request.body
            const {ProjectId}=request.params

            await knex("post")
            .update({legenda})
            .where({ProjectId})

            return response.send()

        } catch (error) {
            next(error)
        }
    } 

    
   
}
