import { sequelizeConfig } from "../config";
const { DataTypes } = require('sequelize');

const Comment = sequelizeConfig.define('Comment', {
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
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'comments',
  timestamps: true,
  indexes: [
    {
      fields: ['characterId']
    }
  ]
});

export { Comment };