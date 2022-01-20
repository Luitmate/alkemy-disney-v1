'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie }) {
      // define association here
      Character.belongsToMany(Movie, { through: 'characterMovies', as: 'movies', timestamps: false })
    }
  }
  Character.init({
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'El nombre no puede ser un campo vacío'
        }
      }
    },
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    story: DataTypes.TEXT
  }, {
    sequelize,
    tableName: 'characters',
    modelName: 'Character',
    timestamps: false
  });
  return Character;
};