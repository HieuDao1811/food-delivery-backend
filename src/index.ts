import express, { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import { sequelize } from './shared/component/sequelize';
import { setupFoodHexagon } from './modules/food';
import { setupCategoryHexagon } from './modules/category';
import { setupUserHexagon } from './modules/user';
import morgan from 'morgan';
import { setupMiddleWares } from './shared/middleware';
import { TokenIntrospectRPCClient } from './shared/repository/verify-token.rpc';
import { responseErr } from './shared/app-error';

config();


(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const app = express();
    const port = process.env.PORT || 3000;
    
    app.use(express.json());
    app.use(morgan('dev'));

    const introspector = new TokenIntrospectRPCClient(process.env.VERIFY_TOKEN_URL || `http://localhost:3000/v1/rpc/introspect`);
    const sctx = { mdlFactory: setupMiddleWares(introspector) };

    app.use('/v1', setupFoodHexagon(sequelize, sctx));
    app.use('/v1', setupCategoryHexagon(sequelize, sctx));
    app.use('/v1', setupUserHexagon(sequelize, sctx));
  
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      responseErr(err, res);
      return next();
    })

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    })
  } catch (error) {
    console.error('Unable to connect to the database: ', error);
    process.exit(1);
  }
})();
