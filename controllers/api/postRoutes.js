const router = require('express').Router();

// import our db connection for the SQL literals
const sequelize = require('../../config/connection');

const { Post, User, Comment } = require('../../models');

// import withAuth from utils
const withAuth = require('../../utils/auth');

//! CREATE !//
// route to sign up a new post
// POST method with endpoint '/api/posts'
// test with: {"title": "Test title for a new post", "text": "This is text for the new post"}
///// TODO: Authenticate - only authenticated users can create a post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            text: req.body.text,
            ///// TODO: userId will come from req.sessions once we have set up our sessions
            //// userId: req.body.userId
            userId: req.session.userId
        });

        res.status(201).json(newPost);
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

//! READ !//
// route to retrieve all posts
// GET method with endpoint '/api/posts'
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User, attibutes: ['username'] }],
            attributes: {
                include: [
                    // use plain sql to get a count of the number of comments for each post
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.postId = post.id)'), 'commentsCount'
                    ]
                ]
            }
        });

        res.status(200).json(posts);
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

//! READ !//
// route to retrieve a single post by id
// GET method with endpoint '/api/posts/:postId'
router.get('/:postId', async (req, res) => {

    console.log('Random STRING')

    try {
        const post = await Post.findByPk(req.params.postId, {
            include: [
                { model: User, attibutes: ['username'] },
                { model: Comment, include: { model: User, attributes: ['username'] } },
            ],
            attributes: {
                include: [
                    // use plain sql to get a count of the number of comments for each post
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.postId = post.id)'), 'commentsCount'
                    ]
                ]
            }
        });

        console.log(post)

        res.status(200).json(post);
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

//!  UPDATE !//
// route to update a post by id
// PUT method with endpoint '/api/posts/:postId'
// test with any and all of: {"title": "Updtaed test title for a new post", "text": "This is the updated text for the new post"}

/////TODO: a user can update a post only if authenticated and the creator of the post
router.put('/:postId', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.postId,
                // verify that post belongs to user attempting to update it
                ///// TODO: userId will come from req.session once we have set up our sessions
                userId: req.session.userId
            }
        });

        //// console.log(updatedPost)

        if (!updatedPost[0]) {
            return res.status(406).json({ 
                message: 'This request cannot be completed'
            }); //! 406 - Not Acceptable
        }

        res.status(202).json(updatedPost);
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
})

//! DELETE !//
// route to delete a single post by id
// DELETE method with endpoint '/api/posts/:postId'
///// TODO: only authenticated users can delete their own posts
// TODO: Admin can also delete a post
router.delete('/:postId', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.postId,
                // verify that post belongs to user attempting to delete it
                ///// TODO: userId will come from req.session once we have set up our sessions
                userId: req.session.userId
            }
        });

        //// console.log(deletedPost)

        if (!deletedPost) {
            return res.status(406).json({
                message: 'This request cannot be completed'
            }); //! 406 - Not Acceptable
        }

        res.status(202).json(deletedPost);
    } 
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
})

module.exports = router;