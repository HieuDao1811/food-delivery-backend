import { Request, Response } from "express";
import { responseErr } from "../../../../shared/app-error";
import {  ICommandHandler, Requester } from "../../../../shared/interface";
import { AddFoodToCartCommand } from "../../interface";

export class CartHttpService {
  constructor(
    private readonly addFoodToCartHandler: ICommandHandler<AddFoodToCartCommand, boolean>
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
}