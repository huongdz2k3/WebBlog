'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {

        static associate(models) {
            Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'PostComment' })
            Post.hasMany(models.Tweet, { foreignKey: 'postId', as: 'PostTweet' })
            Post.belongsTo(models.User, { foreignKey: 'id', as: 'userData' })
        }
    }
    Post.init({
        userId: DataTypes.INTEGER,
        title: DataTypes.STRING(1234),
        content: DataTypes.TEXT,
        image: DataTypes.STRING,
        category: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};