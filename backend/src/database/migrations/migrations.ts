import { sequelizeConfig } from "../config";

const runMigrations = async () => {
  try {
    console.log('Starting database migrations...');

    await sequelizeConfig.authenticate()
    await sequelizeConfig.sync({ alter: true });
    
    console.log('All models were synchronized successfully');
    console.log('Migrations completed successfully');
    
    process.exit(0);
  } catch (error) {
    console.error('Error running migrations:', error);
    process.exit(1);
  }
};

runMigrations();