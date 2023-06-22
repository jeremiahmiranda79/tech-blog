const { Model, DataTypes } = require('sequelize');
const connection = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)// returns true or false if passwords match
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: { isEmail: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]//use regex to make for secure
            }
        }
    },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                const plainTextPassword = newUserData.password;
                const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
                newUserData.password = hashedPassword;
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                const plainTextPassword = updatedUserData.password;
                const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
                updatedUserData.password = hashedPassword;
                return updatedUserData;
            }
        },
        sequelize: connection,
        timestamps: false,
        freezeTableName: true,
        modelName: 'user'
    }
);

module.exports = User;