const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models/index');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedData= async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, { individualHooks: true });
    await Post.bulkCreate(postData);
    await Comment.bulkCreate(commentData);

    console.log('Seeded successfully!!!');

    process.exit(0);
}

seedData();