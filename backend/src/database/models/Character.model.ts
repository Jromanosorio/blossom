import { sequelizeConfig } from "../config";
const { DataTypes } = require('sequelize');

const Character =  sequelizeConfig.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Nombre del personaje'
  },
  status: {
    type: DataTypes.ENUM('Alive', 'Dead', 'unknown'),
    allowNull: false,
    comment: 'Estado vital del personaje'
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Especie del personaje'
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Tipo o subtipo del personaje'
  },
  gender: {
    type: DataTypes.ENUM('Female', 'Male', 'Genderless', 'unknown'),
    allowNull: false,
    comment: 'Género del personaje'
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Planeta de origen del personaje'
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'URL de la imagen del personaje'
  }
}, {
  tableName: 'characters',
  timestamps: true,
  indexes: [
    {
      fields: ['status']
    },
    {
      fields: ['species']
    },
    {
      fields: ['gender']
    },
    {
      fields: ['name']
    },
    {
      fields: ['origin']
    }
  ]
});

export { Character };