import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import { z } from 'zod';
import { setupFoodModule } from './modules/food';
import { sequelize } from './shared/component/sequelize';

config();


(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const app = express();
    const port = process.env.PORT || 3000;
    
    app.use(express.json());

    app.use('/v1', setupFoodModule(sequelize));

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    })
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
    process.exit(1);
  }
})();