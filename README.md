# Food Delivery Backend

REST API quản lý món ăn, xây dựng bằng Express, TypeScript, Sequelize, MySQL và Zod.

## Yêu cầu

- Node.js 20 trở lên
- MySQL đang hoạt động
- Bảng `foods` đã được tạo trong database (ứng dụng hiện không có migration và không gọi `sequelize.sync()`)

## Cài đặt

```bash
npm install
```

Tạo file `.env` ở thư mục gốc:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=food_delivery
PRODUCT_SERVICE_URL=http://localhost:3000/v1/foods/
```

Không commit `.env` vì file này chứa thông tin kết nối database.

## Cấu trúc bảng `foods`

Schema tối thiểu mà model hiện tại mong đợi:

```sql
CREATE TABLE foods (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url VARCHAR(255) NULL,
  is_available TINYINT NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL
);
```

## Chạy ứng dụng

```bash
npm run dev
```

Server mặc định chạy tại `http://localhost:3000`. Tất cả endpoint có prefix `/v1`.

## API

### Danh sách món ăn

```http
GET /v1/foods?page=1&limit=10&name=pizza&isAvailable=1
```

Các query parameter đều không bắt buộc. Giá trị mặc định là `page=1`, `limit=10`, `isAvailable=1`; `limit` tối đa là 100.

### Chi tiết món ăn

```http
GET /v1/foods/:id
```

Trả về `404` nếu không tồn tại hoặc món ăn có `is_available = 0`.

### Tạo món ăn

```http
POST /v1/foods
Content-Type: application/json

{
  "name": "Pizza hải sản",
  "description": "Pizza tôm và mực",
  "price": 89000,
  "imageUrl": "https://example.com/pizza.jpg"
}
```

`name` và `price` là bắt buộc; `price` phải lớn hơn 0. API trả về ID UUID v7 với status `201`.

### Cập nhật món ăn

```http
PATCH /v1/foods/:id
Content-Type: application/json

{
  "name": "Pizza hải sản đặc biệt",
  "price": 99000
}
```

Body phải có ít nhất một trường. Các trường hỗ trợ: `name`, `description`, `price`, `imageUrl`, `isAvailable`.

### Xóa món ăn

```http
DELETE /v1/foods/:id
```

Đây là soft delete: API đổi `is_available` thành `0` và trả về status `204`.

## Lỗi hiện tại đã xác định

Các API đọc dữ liệu đang không thống nhất tên thuộc tính timestamp:

- Sequelize được cấu hình `createdAt: "created_at"` và `updatedAt: "updated_at"`, nên object trả về có key `created_at`, `updated_at`.
- `FoodSchema` lại bắt buộc key `createdAt`, `updatedAt`.
- Khi repository gọi `FoodSchema.parse(...)`, Zod báo `expected date, received undefined`.

Ảnh hưởng:

- `GET /v1/foods` trả `500` khi kết quả có ít nhất một bản ghi.
- `GET /v1/foods/:id` trả `500` với ID tồn tại.
- `PATCH /v1/foods/:id` và `DELETE /v1/foods/:id` trả `500` với ID tồn tại vì cả hai đều gọi repository `get()` trước khi ghi.
- `POST /v1/foods` không đi qua bước parse dữ liệu đọc nên không bị lỗi timestamp này.

Cách sửa nên dùng mapping thuộc tính Sequelize thay vì đổi toàn bộ domain model:

```ts
// food.persistence.ts
createdAt: "createdAt",
updatedAt: "updatedAt"
```

và khai báo hai thuộc tính với tên cột tương ứng trong model:

```ts
createdAt: {
  type: DataTypes.DATE,
  field: "created_at"
},
updatedAt: {
  type: DataTypes.DATE,
  field: "updated_at"
}
```

Hoặc bỏ cấu hình alias timestamp hiện tại và để Sequelize quản lý `createdAt`/`updatedAt` với `underscored: true`.

Ngoài ra, `UpdateFoodSchema` hiện nhận `isAvailable` dưới dạng boolean trong khi domain và database dùng `0 | 1`. Cần thống nhất kiểu hoặc chuyển boolean sang số trước khi gọi repository để tránh hành vi phụ thuộc vào ép kiểu của MySQL/Sequelize.

## Kiểm thử

Dự án chưa có test runner; lệnh `npm test` hiện luôn trả lỗi `Error: no test specified`. Nên bổ sung unit test cho use case/repository và integration test cho năm endpoint trước khi triển khai.
