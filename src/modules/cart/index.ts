import { Sequelize } from "sequelize";
import { init as initCart } from "./infras/repository/sequelize/cart-persistence/cart.persistence";
import { init as initCartItem, modelName as cartItemModelName } from "./infras/repository/sequelize/cart-item-persistence/cart-item.persistence";
import { Router } from "express";
import { CartRepository } from "./infras/repository/sequelize/cart-persistence";
import { CartItemRepository } from "./infras/repository/sequelize/cart-item-persistence";
import { AddFoodToCartCmdHandler } from "./usecase/add-food-to-cart";
import { FoodRepository } from "../food/infras/repository/sequelize";
import { modelName as cartModelName } from "./infras/repository/sequelize/cart-persistence/cart.persistence";
import { CartHttpService } from "./infras/transport";
import { ServiceContext } from "../../shared/interface/service-context";
import { CartFoodRepository } from "./infras/repository/rpc";
import { config } from "../../shared/component/config";

export const setupCartHexagon = (sequelize: Sequelize, sctx: ServiceContext) => {
  initCart(sequelize);
  initCartItem(sequelize);

  const cartRepository = new CartRepository(sequelize, cartModelName);
  const cartItemRepository = new CartItemRepository(sequelize, cartItemModelName);
  const foodRepository = new CartFoodRepository(config.productServiceUrl);

  const addFoodToCartCmdHandler = new AddFoodToCartCmdHandler(
    cartItemRepository,
    cartItemRepository,
    cartRepository,
    cartRepository,
    foodRepository
  );

  const httpService = new CartHttpService(
    addFoodToCartCmdHandler
  )

  const router = Router();
  const mdlFactory = sctx.mdlFactory;
  
  router.post('/carts', mdlFactory.auth, httpService.addFoodToCartAPI.bind(httpService));

  return router;
};