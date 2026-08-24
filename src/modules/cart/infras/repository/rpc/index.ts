import axios from "axios";
import { IFoodRepository } from "../../../interface";
import { CartFood } from "../../../model/cart";

export class CartFoodRepository implements IFoodRepository {
  constructor(private readonly productServiceUrl: string) {}

  async findById(id: string): Promise<CartFood | null> {
    const { data } = await axios.get(`${this.productServiceUrl}${id}`);
    const food = data.data;

    return {
      id: food.id,
      name: food.name,
      price: food.price,
      imageUrl: food.image
    }
  }
  async findByIds(ids: string[]): Promise<CartFood[]> {
    const { data } = await axios.post(`${this.productServiceUrl}/list`, { ids });
    const collection = data.data;

    return collection.map((food: any) => ({
      id: food.id,
      name: food.name,
      price: food.price,
      imageUrl: food.image
    }))
  }
}