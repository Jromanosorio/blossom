import { Sequelize } from "sequelize";

const dotenv = require('dotenv');
dotenv.config()

// MySQL Database config paremeters

const sequelizeConfig = new Sequelize({
    dialect: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '3306'),
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'testDB',
})

const testConnection = async () => {
  try {
    await sequelizeConfig.authenticate();
    console.log('Database connection established successfully');
    return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
};

export { 
  sequelizeConfig, 
  testConnection
}