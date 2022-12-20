import user from "../models/user.js";
import post from "../models/post.js";

//Read
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const usr = await user.findById(userId);

    const newPost = new post({
      userId,
      firstname: usr.firstname,
      lastname: usr.lastname,
      location: usr.location,
      description,
      picturePath,
      userPicturePath: usr.picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const pst = await post.find();
    res.status(201).json(pst);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const pst = await post.find();
    res.status(200).json(pst);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const pst = await post.findById(userId);
    res.status(200).json(pst);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

//Update
export const likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const pst = await post.findById(id);
    const isLiked = pst.likes.get(userId);

    if (isLiked) {
      pst.likes.delete(userId);
    } else {
      pst.likes.set(userId, true);
    }

    const updatedPost = await post.findByIdAndUpdate(
      id,
      { likes: pst.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};
