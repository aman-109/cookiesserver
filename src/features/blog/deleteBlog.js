
const Blog = require("./blog.model");


////DELETE
const deleteBlog= async (req, res) => {
  try {
    let deleteBlog = await Blog.findByIdAndDelete(req.params.id);

    res
      .status(201)
      .send(`This Blog with id:${deleteBlog.id} deleted successfully`);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

// module.exports = {getBlog,getSingleBlog,createBlog,editBlog,deleteBlog};
module.exports=deleteBlog
