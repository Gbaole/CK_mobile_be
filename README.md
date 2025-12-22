Backend quản lý cửa hàng bán máy game (PS3, PS4, PS5, Nintendo, Xbox, phụ kiện, game).

**Base URL:** `http://localhost:8000/api/v1`

---

## I. Cài đặt

1. **Cài Node.js và npm**

- Tải Node.js (đã bao gồm npm) từ [https://nodejs.org/](https://nodejs.org/)
- Kiểm tra phiên bản Node.js và npm đã cài đặt:

```bash
node -v
npm -v
```

2. **Clone repo**

```bash
git clone https://github.com/Gbaole/mobilebe.git
cd https://github.com/Gbaole/mobilebe.git
```

3. **Cài đặt dependencies**

```bash
npm install
```

4. **Tạo file `.env`** và thêm các biến môi trường:

```
PORT=8000
MONGO_URI=
JWT_SECRET=s8IdY9\YzrmR60Az@!/J-\uAESebbIMa?X*L50K2Ybymv\2d/gY-3e
JWT_EXPIRES_IN = 30d
```

5. **Chạy server**

- run dev

```bash
npm run dev
```

6. **Seed dữ liệu mẫu**

```bash
npm run seed
```

> Seeder sẽ tạo sẵn Brand, Category, Product với ảnh mặc định.

---

## II. Endpoints

### 1. Hiển thị tất cả danh mục.

- **Method:** `GET`
- **Endpoint:** `/categories`
- **Example URL:** `localhost:8000/api/v1/categories`
- **Response Example:**

```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    {
      "_id": "692404e8572ee56f0f97fbc1",
      "name": "Console",
      "slug": "console",
      "__v": 0,
      "createdAt": "2025-11-24T07:10:32.434Z",
      "updatedAt": "2025-11-24T07:10:32.434Z"
    },
    {
      "_id": "692404e8572ee56f0f97fbc2",
      "name": "Accessory",
      "slug": "accessory",
      "__v": 0,
      "createdAt": "2025-11-24T07:10:32.434Z",
      "updatedAt": "2025-11-24T07:10:32.434Z"
    },
    {
      "_id": "692404e8572ee56f0f97fbc3",
      "name": "Game",
      "slug": "game",
      "__v": 0,
      "createdAt": "2025-11-24T07:10:32.434Z",
      "updatedAt": "2025-11-24T07:10:32.434Z"
    }
  ]
}
```

---

### 2. Get Products by Category

Hiển thị sản phẩm theo từng danh mục.

- **Method:** `GET`
- **Endpoint:** `/products/category/:categoryId`
- **Example URL:** `localhost:8000/api/v1/products/category/692404e8572ee56f0f97fbc3`
- **Parameters:**

  - `categoryId` (string, required) – ID của danh mục

- **Response Example:**

```json
{
  "success": true,
  "message": "Products by category",
  "data": [
    {
      "specs": {
        "region": "US"
      },
      "_id": "692404e8572ee56f0f97fbcf",
      "name": "Zelda: Breath of the Wild",
      "type": "game",
      "brand": {
        "_id": "692404e8572ee56f0f97fbbe",
        "name": "Nintendo",
        "slug": "nintendo",
        "__v": 0,
        "createdAt": "2025-11-24T07:10:32.366Z",
        "updatedAt": "2025-11-24T07:10:32.366Z"
      },
      "category": {
        "_id": "692404e8572ee56f0f97fbc3",
        "name": "Game",
        "slug": "game",
        "__v": 0,
        "createdAt": "2025-11-24T07:10:32.434Z",
        "updatedAt": "2025-11-24T07:10:32.434Z"
      },
      "price": 59,
      "discount": 0,
      "stock": 25,
      "condition": "new",
      "description": "Nintendo Switch game",
      "images": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Sony-PlayStation-4-PS4-wDualShock-4.jpg/500px-Sony-PlayStation-4-PS4-wDualShock-4.jpg"
      ],
      "slug": "zelda-breath-of-the-wild",
      "sold": 20,
      "__v": 0,
      "createdAt": "2025-11-24T07:10:32.505Z",
      "updatedAt": "2025-11-24T07:10:32.505Z"
    }
  ]
}
```

---

### 3. Hiển thị 10 sản phẩm bán chạy nhất.

- **Method:** `GET`
- **Endpoint:** `/products/top-selling`
- **Example URL:** `localhost:8000/api/v1/products/top-selling`
- **Response Example:**

```json
{
  "success": true,
  "message": "Top selling products",
  "data": [
    {
      "specs": {
        "color": "White"
      },
      "_id": "692404e8572ee56f0f97fbcb",
      "name": "DualSense Controller",
      "type": "accessory",
      "brand": {
        "_id": "692404e8572ee56f0f97fbbe",
        "name": "Nintendo",
        "slug": "nintendo",
        "__v": 0,
        "createdAt": "2025-11-24T07:10:32.366Z",
        "updatedAt": "2025-11-24T07:10:32.366Z"
      },
      "category": {
        "_id": "692404e8572ee56f0f97fbc2",
        "name": "Accessory",
        "slug": "accessory",
        "__v": 0,
        "createdAt": "2025-11-24T07:10:32.434Z",
        "updatedAt": "2025-11-24T07:10:32.434Z"
      },
      "price": 69,
      "discount": 0,
      "stock": 50,
      "condition": "new",
      "description": "PS5 controller",
      "images": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Sony-PlayStation-4-PS4-wDualShock-4.jpg/500px-Sony-PlayStation-4-PS4-wDualShock-4.jpg"
      ],
      "slug": "dualsense-controller",
      "sold": 35,
      "__v": 0,
      "createdAt": "2025-11-24T07:10:32.504Z",
      "updatedAt": "2025-11-24T07:10:32.504Z"
    }
  ]
}
```

---

### 4. Hiển thị 10 sản phẩm được tạo trong vòng 7 ngày gần nhất.

- **Method:** `GET`
- **Endpoint:** `/products/new-products`
- **Example URL:** `localhost:8000/api/v1/products/new-products`
- **Response Example:**

```json
{
  "success": true,
  "message": "New products",
  "data": [
    {
      "specs": {
        "region": "US"
      },
      "_id": "692404e8572ee56f0f97fbcf",
      "name": "Zelda: Breath of the Wild",
      "type": "game",
      "brand": {
        "_id": "692404e8572ee56f0f97fbbe",
        "name": "Nintendo",
        "slug": "nintendo",
        "__v": 0,
        "createdAt": "2025-11-24T07:10:32.366Z",
        "updatedAt": "2025-11-24T07:10:32.366Z"
      },
      "category": {
        "_id": "692404e8572ee56f0f97fbc3",
        "name": "Game",
        "slug": "game",
        "__v": 0,
        "createdAt": "2025-11-24T07:10:32.434Z",
        "updatedAt": "2025-11-24T07:10:32.434Z"
      },
      "price": 59,
      "discount": 0,
      "stock": 25,
      "condition": "new",
      "description": "Nintendo Switch game",
      "images": [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Sony-PlayStation-4-PS4-wDualShock-4.jpg/500px-Sony-PlayStation-4-PS4-wDualShock-4.jpg"
      ],
      "slug": "zelda-breath-of-the-wild",
      "sold": 20,
      "__v": 0,
      "createdAt": "2025-11-24T07:10:32.505Z",
      "updatedAt": "2025-11-24T07:10:32.505Z"
    }
  ]
}
```
# CK_mobile_be
