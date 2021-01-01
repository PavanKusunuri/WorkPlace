import { protect } from '../middleware/authMiddleware.js';
import asyncHandler from 'express-async-handler';

import Post from '../models/postModel.js';
import User from '../models/userModel.js'

// @route  POST api/posts
// @desc   Create a new post
// @access Private

const createPost = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        throw new Error('Issue while creating an Post..' + err)
    }
});


// @route  GET api/posts
// @desc   GET all posts
// @access Private
router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).server("Server Error");
    }
});



// @route  GET api/posts/:id
// @desc   GET post by ID
// @access Private
router.get("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        res.json(post);
    } catch (err) {
        if (err.kind === "objectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).server("Server Error");
    }
});



//  @route   DELETE api/posts/:id
//  @desc    Delete a Post
//  @access  Private

router.delete("/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //  Check Post
        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        // Check user
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        await post.remove();

        res.json({ msg: "Post removed" });
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found" });
        }
        res.status(500).send("Server Error");
    }
});


// @route  PUT api/posts/like/:id
// @desc   Like a post
// @access Private
router.put("/like/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //  Check if the posthas already been liked

        if (
            post.likes.filter((like) => like.user.toString() === req.user.id).length >
            0
        ) {
            return res.status(400).json({ msg: "Post already liked" });
        }
        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route  PUT api/posts/unlike/:id
// @desc   Like a post
// @access Private
router.put("/unlike/:id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //  Check if the post has already been liked

        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
        ) {
            return res.status(400).json({ msg: "Post has not yet been liked" });
        }

        //  Get remove Index

        const removeIndex = post.likes
            .map((like) => like.user.toString())
            .indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// @route  POST api/posts/comment/:id
// @desc   Comment a post
// @access Private
router.post(
    "/comment/:id",
    [auth, [check("text", "Text is required").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user = await User.findById(req.user.id).select("-password");
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id,
            };

            post.comments.unshift(newComment);

            await post.save();

            res.json(post.comments);
        } catch (err) {
            res.status(500).send("Server Error");
        }
    }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //  Pull out comment
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );

        //  Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: "Comment does not exist" });
        }
        //  Check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" });
        }

        // Get Remove Index

        const removeIndex = post.comments
            .map((comment) => comment.user.toString())
            .indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);
        await post.save();

        res.json(post.comments);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

export { createPost }