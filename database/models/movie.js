'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Genre, Character }) {
      // define association here
      Movie.belongsTo(Genre)
      Movie.belongsToMany(Character, { through: 'characterMovies', as: 'characters',
    timestamps: false })
    }
  }
  Movie.init({
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'El titulo no puede ser un campo vacío'
        }
      }
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ratingIMDB: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min : 1,
        max: 5,
      }
    }
  }, {
    sequelize,
    tableName: 'movies',
    modelName: 'Movie',
    timestamps: false
  });
  return Movie;
};