const postModel = require("../model/postModel");

const getPost = async (req, res) => {
  const { username } = req.params;
  try {
    const post = await postModel.find({ username: username });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getAllPost = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;
    if (username) {
      posts = await postModel.find({ username: username });
    } else if (catName) {
      posts = await postModel.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await postModel.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json(error);
  }
};

// const addPost = async (req, res) => {
//   const newPost = new postModel(req.body);

//   try {
//     const savePost = await newPost.save();
//     res.status(200).json(savePost);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const addPost = async (req, res) => {
  const { username, pic, desc, title } = req.body;

  try {
    const newPost = await postModel.create({ username, pic, desc, title });
    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ success: false, error: "Failed to add post" });
  }
};

module.exports = { addPost };


const updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const updatePost = await postModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {
            new: true,
          }
        );
        res.status(200).json(updatePost);
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      res.status(500).json("you can update only your post...");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("post has been deleted...");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(500).json("you can delete only your post...");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

const category = async (req, res) => {
  const { category } = req.params;

  const post = await postModel
    .find({
      categories: { category },
    })
    .then((data) => {
      res.send(data);
    });

  if (!post) {
    res.send("No Post Found");
  }
};

module.exports = {
  addPost,
  deletePost,
  updatePost,
  getPost,
  getAllPost,
  category,
};
