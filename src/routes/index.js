const express = require('express')
let router = express.Router()


const userRouter = require("../features/user/user.route");

router
.post("/users/login",userRouter.login)
.post("/users/signup",userRouter.signup)
.get("/users/refresh",userRouter.refresh)



const blogRouter = require("./blog");


router
.get("/blogs",blogRouter.verifyToken,blogRouter.getBlog)
.get("/blogs/:id",blogRouter.verifyToken,blogRouter.getSingleBlog)
.post("/blogs",blogRouter.verifyToken,blogRouter.createBlog)
.patch("/blogs",blogRouter.verifyToken,blogRouter.editBlog)
.delete("/blogs/:id",blogRouter.verifyToken,blogRouter.deleteBlog)


module.exports=router