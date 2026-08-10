import express, { Request, Response } from 'express';
import { config } from 'dotenv';
import { z } from 'zod';
config();

const app = express();
const port = process.env.PORT || 3000;

const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3, 'name at least 3 characters'),
  image: z.string().optional()
})

type Category = z.infer<typeof CategorySchema>;

app.post('v1/categories', (req: Request, res: Response) => {
  const { success, data, error } = CategorySchema.safeParse(req.body);

  if(!success) {
    res.status(400).json({
      message: 'Name is required',
    })

    return;
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})