const router = require('express').Router();

// import our db connection for the SQL literals
const sequelize = require('../../config/connection');

const { Post, User, Comment } = require('../../models');

module.exports = router;