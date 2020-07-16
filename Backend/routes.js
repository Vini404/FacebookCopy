const express = require("express")
const routes = express.Router()
const UsersController = require("./src/controller/UsersController")
const PostController = require("./src/controller/PostController")
const LoginController = require("./src/controller/LoginController")
const ProfileController = require("./src/controller/ProfileController")



//Login and verify Projects
routes.post("/login", LoginController.create)
routes.get("/profile", ProfileController.index)

//Users
routes.post("/", UsersController.create)
routes.get("/", UsersController.index)
routes.delete("/:id", UsersController.delete)


//Projects
routes.get("/projects", PostController.index)
routes.post("/projects",PostController.create)
routes.delete("/projects/:ProjectId", PostController.delete)
routes.put("/projects/:ProjectId", PostController.update)






module.exports = routes