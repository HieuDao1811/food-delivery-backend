import dotenv from "dotenv";

dotenv.config();

export const config = {
  mysql: {
    database: process.env.DB_NAME || "",
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "",
    port: parseInt(process.env.DB_PORT as string),
    dialect: "mysql",
    pool: {
      max: 20,
      min: 2,
      acquire: 30000,
      idle: 60000
    },
    logging: false
  },
  accessToken: {
    secretKey: process.env.JWT_SECRET_KEY || "hieudao1811",
    expiresIn: "7d"
  },
  productServiceUrl: process.env.PRODUCT_SERVICE_URL || "http://localhost:3000/v1/rpc/foods",
  categoryServiceUrl: process.env.CATEGORY_SERVICE_URL || "http://localhost:3000/v1/rpc/categories"
};