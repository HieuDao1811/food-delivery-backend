import axios from "axios";
import {
  FoodCategory,
  FoodCategorySchema
} from "../../../model/model";

export class FoodCategoryRPCRepository {
  constructor(private readonly url: string) {}

  async findById(id: string): Promise<FoodCategory | null> {
    try {
      const { data } = await axios.get(`${this.url}/${id}`);
      return FoodCategorySchema.parse(data.data);
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }

      throw error;
    }
  }
}