const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//! CREATE !//
// route to create a new comment
// POST method with endpoint '/api/comments'
// test with: {"text": "This is text for the new comment", "postId": 1}
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            userId: req.session.userId
        });

        res.status(201).json(newComment);
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
})

//! READ !//
// route to retrieve all comments
// GET method with endpoint '/api/comments'
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll(
        {
            include: [{
                model: User,
                attributes: ['username']    
            },
            {
                model: Post, 
                include: {
                    model: User,
                    attributes: ['username']
                }
            }]
        });

        res.status(200).json(comments);
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
})

// route to retrieve a single comment by id
// GET method with endpoint '/api/comments/:commentId'
router.get('/:commentId', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.commentId, {
            include: [
                { 
                    model: User, 
                    attibutes: ['username']
                },
                { 
                    model: Post, 
                    include: 
                        { 
                            model: User,
                            attributes: ['username']
                        } 
                },
            ]
        });

        res.status(200).json(comment);
    } 
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

//! UPDATE !//
// route to update a single comment by id
// PUT method with endpoint '/api/comments/:commentId'
// test with: {"text": "This is the updated text for an existing comment"}
router.put('/:commentId', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.commentId,
                // comment must belong to user attempting to update it
                userId: req.session.userId,
            }
        });

        if (!updatedComment[0]) {
            return res.status(406).json({
                message: 'This request cannot be completed'
            });
        }

        res.status(202).json(updatedComment);
    } 
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

//! DELETE !//
// route to delete a single comment by id
// DELETE method with endpoint '/api/comments/:commentId'
// TODO: ICEBOX => admin can also delete a comment 
router.delete('/:commentId', withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            // verify that comments belong to user attempting to delete it
            where: 
            { 
                id: req.params.commentId, 
                userId: req.session.userId
            }
        });

        if (!deletedComment) {
            return res.status(406).json({ message: 'This request cannot be completed'});
        }

        res.status(202).json(deletedComment);
    } 
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
})

module.exports = router;