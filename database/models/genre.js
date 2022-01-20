'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie }) {
      // define association here
      Genre.hasMany(Movie, { foreignKey: 'GenreId'})
    }
  }
  Genre.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre del genero no puede ser un campo vacío'
        }
      }
    },
    image: DataTypes.TEXT
  }, {
    sequelize,
    tableName: 'genres',
    modelName: 'Genre',
    timestamps: false
  });
  return Genre;
};