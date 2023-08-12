const router = require('express').Router();

// import connection to the database for SQL literals
const sequelize = require('../../config/connection');

const { User, Post, Comment } = require('../../models');

// import withAuth from utils
const withAuth = require('../../utils/auth');

//! CREATE !//
// route to sign up a new user
// POST method with endpoint '/api/users'
// test with: {"username": "testUser", "email": "testUser@email.com", "password": "Password123"}
router.post('/', async (req, res) => {
    //// console.log('req.body', req.body)

    try {
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // // TODO: Modify session object to include user information and loggedIn boolean
        // save new session to db
        req.session.save(() => {
            // create session variables based on the newly signed up user
            req.session.userId = newUser.id,
            req.session.loggedIn = true
            res.status(201).json(newUser) //! 201 - Created
        });    
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

//! READ !//
// route to retrieve all users
// GET method with endpoint '/api/users/'
// TODO: (ICEBOX) authenticate - only admin can view all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: {
                exclude: ['password'], 
                include: [
                    // Use plain SQL to get a count of the number of posts made by a user
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM post WHERE post.userID = user.id)'), 'postCount'
                    ],
                    // Use plain SQL to get a count of the number of comments made by a user
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.userID = user.id)'), 'commentsCount'
                    ]
                ]
            }
        });

        res.status(200).json(users); //! 200 - OK
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

// route to retrieve logged in users profile
// GET method with endpoint '/api/users/profile'
///// TODO: (ICEBOX) authenticate - only admin can view all users
router.get('/profile', withAuth, async (req, res) => {
    // if the user is not logged in, redirec the user to the login page
    // if (!req.session.loggedIn) {
    //     return res.redirect('/login');
    // }
    
    try {
        const user = await User.findByPk(req.session.userId, {
            include: [
                { model: Post }, 
                { model: Comment, include: { model: Post, attributes: ['title'] } }
            ],
            attributes: {
                exclude: ['password'],
                include: [
                    // Use plain SQL to get a count of the number of posts made by a user
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM post WHERE post.userID = user.id)'), 'postCount'
                    ],
                    // Use plain SQL to get a count of the number of comments made by a user
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.userID = user.id)'), 'commentsCount'
                    ]
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ 
                message: 'No user found'
            }); //! 404 - Not Found
        }

        res.status(200).json(user); //! 200 - OK
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

// route to retrieve a single user by id
// GET method with endpoint '/api/users/:usersId'
// TODO: (ICEBOX) authenticate - only admin or account owner can view a single user
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId, {
            include: [
                { model: Post }, 
                { model: Comment, include: { model: Post, attributes: ['title'] } }
            ],
            attributes: {
                exclude: ['password'],
                include: [
                    // Use plain SQL to get a count of the number of posts made by a user
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM post WHERE post.userID = user.id)'), 'postCount'
                    ],
                    // Use plain SQL to get a count of the number of comments made by a user
                    [
                        sequelize.literal('(SELECT COUNT(*) FROM comment WHERE comment.userID = user.id)'), 'commentsCount'
                    ]
                ]
            }
        });

        if (!user) {
            return res.status(404).json({ 
                message: 'No user found'
            }); //! 404 - Not Found
        }

        res.status(200).json(user); //! 200 - OK
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

//! UPDATE !//
// route to update a user by id
// PUT method with endpoint '/api/users/profile'
// test with any and all of: {"username": "updatedtestUser", "email": "updatedtestUser@email.com", "updatedpassword": "updatedPassword123"}
///// TODO: Authenticate - only account owners can update thier own account
router.put('/profile', withAuth, async (req, res) => {
    ////console.log('req.body', req.body)

    try {
        // pass in req.body to only update what is sent over by the client
        const updatedUser = await User.update(
            req.body, {
                where: {
                    id: req.session.userId
                }, 
                individualHooks: true
            }
        );

        //// console.log(updatedUser)

        if (!updatedUser[0]) {
            return res.status(404).json({
                message: 'No user found' 
            }); //! 404 - Not Found
        }

        res.status(202).json(updatedUser); //! 202 - Accepted
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

//! DELETE !//
// route to delete a user by id
// DELETE method with endpoint '/api/users/profile'
///// TODO: Authenticate - only admin can delete an account
router.delete('/profile', withAuth, async (req, res) => {
    ////console.log('req.body', req.body)
    // if the user is not logged in, redirect the user to the login page
    // if (!req.session.loggedIn) {
    //     return res.redirect('/login');
    // }

    try {
        const deletedUser = await User.destroy({
            where: {
                id: req.session.userId
            }
        });

        ////console.log(deletedUser)

        if (!deletedUser) {
            return res.status(404).json({
                message: 'No user found'
            }); //! 404 - Not Found
        }

        res.status(202).json(deletedUser); //! 202 - Accepted
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

// route to delete a user by id
// DELETE method with endpoint '/api/users/:userId'
// TODO: (ICEBOX) Authenticate - only admin can delete an account
router.delete('/:userId', async (req, res) => {
    console.log('req.body', req.body)

    try {
        const deletedUser = await User.destroy({
            where: {
                id: req.params.userId
            }
        });

        ///// console.log(deletedUser)

        if (!deletedUser) {
            return res.status(404).json({
                message: 'No user found'
            }); //! 404 - Not Found
        }

        res.status(202).json(deletedUser); //! 202 - Accepted
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
});

///// TODO: add a login route 
//! LOGIN !//
// Route to login an existing user
// POST method with endpoint '/api/users/login'
// expects {"email": "cblazek9@bizjournals.com", "password": "tN4)nzp>?H"}
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.status(400).json({
                message: 'Credentials not valid'
            }); //! 400 - Bad Request
        }

        const validPw = await user.checkPassword(req.body.password);

        if (!validPw) {
            return res.status(400).json({
                message: 'Credentials not valid'
            }); //! 400 - Bad Request
        }

        req.session.save(() => {
            // create session variable based on the logged in user
            req.session.userId = user.id;
            req.session.userName = user.username;
            req.session.userEmail = user.email;
            req.session.loggedIn = true;
            res.status(200).json(user); //! 200 - OK
        });
    } 
    catch (error) {
        console.log(error)
        res.status(500).json(error); //! 500 - Internal Server Error
    }
})

///// TODO: add a logout route
//! LOGOUT !//
// Route to log out an existing user
// POST method with endpoint 'api/users/logout'
router.post('/logout', async (req, res) => {
    if (req.session.loggedIn) {
        //req.session.loggedIn = false;

        req.session.destroy(() => {
            res.status(204).end(); //! 204 - No Content 
        });
    }
    else {
        res.status(404).end(); //! 404 Not Found
    }
});

module.exports = router;