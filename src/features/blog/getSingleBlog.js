
const Blog = require("./blog.model");



///GET /:id
const getSingleBlog= async (req, res) => {
  try {
    let existingBlog = await Blog.findById(req.params.id);
    if (!existingBlog) {
      res.status(401).send("Blog not found");
    } else {
      let data = await Blog.findById(req.params.id).populate({
        path: "author",
        select: "name",
      });
      res.send(data);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}


// module.exports = {getBlog,getSingleBlog,createBlog,editBlog,deleteBlog};
module.exports=getSingleBlog
