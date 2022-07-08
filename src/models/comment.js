'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {

        static associate(models) {

        }
    }
    Comment.init({
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
        content: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};