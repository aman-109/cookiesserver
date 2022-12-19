
const Blog = require("./blog.model");


///PATCH
const editBlog= async (req, res) => {
  let id = req.params.id;
  try {
    let updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    ).populate({ path: "author", select: ["name", "email", "gender"] });

    res.send(updatedBlog);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

// module.exports = {getBlog,getSingleBlog,createBlog,editBlog,deleteBlog};
module.exports=editBlog
