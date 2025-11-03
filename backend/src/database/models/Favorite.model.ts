import { sequelizeConfig } from "../config";
const { DataTypes } = require('sequelize');

const Favorite =  sequelizeConfig.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  characterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'characters',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'favorites',
  timestamps: true,
  indexes: [
    {
      fields: ['characterId']
    }
  ]
});

export { Favorite };