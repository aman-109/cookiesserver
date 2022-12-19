
const Blog = require("./blog.model");


////GET////
const getBlog= async (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  try {
    let data = await Blog.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "author", select: "name" });
    res.send(data);
  } catch (e) {
    res.status(500).send(e.message);
  }
}
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
module.exports=getBlog
