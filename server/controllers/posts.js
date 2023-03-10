import Post from '../models/Post.js';
import User from '../models/User.js';

/* CREATE */
export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        await newPost.save();

        const post = await Post.find();

        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* UPDATE */

export const updatePost = async (req, res) => {
    try {
        const { postId, description, picturePath } = req.body;
        let update = {};

        if (description) {
            update.description = description;
        }

        if (picturePath) {
            update.picturePath = picturePath;
        } else {
            update.picturePath = '';
        }

        if (Object.keys(update).length > 0) {
            const post = await Post.findByIdAndUpdate(postId, update);
            return res.status(200).json(post);
        } else {
            res.status(404).json({ message: "You didn't change anything" });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(id, { likes: post.likes }, { new: true });

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

/* DELETE */
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);

        const deletedPost = await Post.findByIdAndDelete(id);
        const userPosts = await Post.find({ userId });
        const allPosts = await Post.find({});

        res.status(200).json({ userPosts, allPosts });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
