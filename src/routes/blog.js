let blog=module.exports={}

blog.verifyToken=require("../middleware/auth.middleware")
blog.getBlog=require("../features/blog/getBlog")
blog.getSingleBlog=require("../features/blog/getSingleBlog")
blog.createBlog=require("../features/blog/createBlog")
blog.editBlog=require("../features/blog/editBlog")
blog.deleteBlog=require("../features/blog/deleteBlog")

