import { Request, Response } from "express";
import { responseErr } from "../../../../shared/app-error";
import {  ICommandHandler, IQueryHandler, Requester } from "../../../../shared/interface";
import { AddFoodToCartCommand, GetMyCartQuery, RemoveItemCommand } from "../../interface";
import { CartDetail } from "../../model/cart";

export class CartHttpService {
  constructor(
    private readonly addFoodToCartHandler: ICommandHandler<AddFoodToCartCommand, boolean>,
    private readonly removeItemHandler: ICommandHandler<RemoveItemCommand, boolean>,
    private readonly getMyCartHandler: IQueryHandler<GetMyCartQuery, CartDetail | null>
  ) {}

  async addFoodToCartAPI(req: Request, res: Response) {
    try {
      const requester = res.locals.requester as Requester;
      const result = await this.addFoodToCartHandler.execute({
        userId: requester.sub,
        cmd: req.body
      });

      res.status(200).json({ data: result });
    } catch (error) {
      responseErr(error as Error, res);
    }
  }

  async removeItemAPI(req: Request, res: Response) {
    try {
      const cartId = req.params.cartId as string;
      const foodId = req.params.foodId as string;

      const result = await this.removeItemHandler.execute({ cartId, foodId });
      res.status(200).json({ data: result });
    } catch (error) {
      responseErr(error as Error, res);
    }
  }

  async getMyCartAPI(req: Request, res: Response) {
    try {
      const requester = res.locals.requester;

      const result = await this.getMyCartHandler.query({ userId: requester.sub });
      res.status(200).json({ data: result });
    } catch (error) {
      responseErr(error as Error, res);
    }
  }
}