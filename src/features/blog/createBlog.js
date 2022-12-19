
const Blog = require("./blog.model");



////POST///
const createBlog= async (req, res) => {
  let { content } = req.body;
  // console.log(content)
  try {
    let existingBlog = await Blog.findOne({ content });
    if (existingBlog) {
      res.status(401).send("Blog already created");
    } else {
      let newBlog = await Blog.create({ ...req.body, author: req.userId });
      // .populate({path:"author", select:"name"})

      res.status(201).send(newBlog);
    }
  } catch (e) {
    res.status(500).send(e.message);
  }
}


// module.exports = {getBlog,getSingleBlog,createBlog,editBlog,deleteBlog};
module.exports=createBlog
