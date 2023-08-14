const router = require('express').Router();
// import our db connection for the SQL literals
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');

// Render homepage with all existing posts
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

        const serializedPosts = posts.map(post => post.get({ plain: true}));

        res.status(200).render('homepage', {
            posts: serializedPosts, 
            loggedIn: req.session.loggedIn,
            userId: req.session.userId,
        });
    } 
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        let post = await Post.findByPk(req.params.id, {
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

        if (!post) {
            return res.status(404).json({
                message: 'No post found'
            });
        }

        sequelizedPost = post.get({ plain: true});

        res.render('blogpost', {
            post: sequelizedPost,
            loggedIn: req.session.loggedIn
        });
    } 
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

// Render signup page
router.get('/signup', async (req, res) => {
    if (req.session.loggedIn) return res.status(200).redirect('/');
	res.status(200).render('signup');
});

// Render loggin page
router.get('/login', async (req, res) => {
    if (req.session.loggedIn) return res.status(200).redirect('/');
	res.status(200).render('login');
});

module.exports = router;