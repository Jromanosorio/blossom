import { sequelizeConfig } from "../config";
const { DataTypes } = require('sequelize');

const Character = sequelizeConfig.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Alive', 'Dead', 'Unknown'),
    allowNull: false,
  },
  species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Female', 'Male', 'Genderless', 'unknown'),
    allowNull: false,
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
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