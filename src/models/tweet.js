'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tweet extends Model {

        static associate(models) {

        }
    }
    Tweet.init({
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Tweet',
    });
    return Tweet;
};