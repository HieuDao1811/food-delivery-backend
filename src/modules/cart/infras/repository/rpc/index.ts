import axios from "axios";
import { IFoodRepository } from "../../../interface";
import z from "zod";
import { CartFood, CartFoodSchema } from "../../../model/cart-item";

export class CartFoodRPCRepository implements IFoodRepository {
  constructor(private readonly productServiceUrl: string) {}

  async findById(id: string): Promise<CartFood | null> {
    try { 
      const { data } = await axios.get(`${this.productServiceUrl}/${id}`);
      const food = CartFoodSchema.parse(data.data);

      return food;
    } catch (error) {
      return null;
    }
  }
  async findByIds(ids: string[]): Promise<CartFood[]> {
    const { data } = await axios.post(`${this.productServiceUrl}/by-ids`, { ids });
    const collection = z.array(CartFoodSchema).parse(data.data);

    return collection;
  }
}