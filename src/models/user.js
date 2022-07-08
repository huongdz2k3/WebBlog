'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.Comment, { foreignKey: 'userId', as: 'userComment' })
      User.hasMany(models.Tweet, { foreignKey: 'userId', as: 'userTweet' })
      User.hasMany(models.Post, { foreignKey: 'userId', as: 'userPost' })

    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};