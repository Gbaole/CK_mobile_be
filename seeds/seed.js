// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js"; // Import thêm Model Order
import { OrderStatus, PaymentMethod } from "../enums/order.enum.js"; // Đảm bảo đường dẫn này đúng

dotenv.config({ path: ".env" });

const TARGET_USER_ID = "69541244000e7c4688f181b6"; // User nhận đơn hàng giả

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

const brands = [
  { name: "Sony", slug: "sony" },
  { name: "Microsoft", slug: "microsoft" },
  { name: "Nintendo", slug: "nintendo" },
];

const categories = [
  { name: "Console", slug: "console" },
  { name: "Accessory", slug: "accessory" },
  { name: "Game", slug: "game" },
];

const products = [
  {
    name: "PlayStation 5",
    type: "console",
    price: 499,
    stock: 20,
    sold: 15,
    condition: "new",
    description: "Sony PS5 console",
    specs: { storage: "1TB", color: "White", region: "US" },
    slug: "ps5-console",
  },
  {
    name: "PlayStation 4",
    type: "console",
    price: 299,
    stock: 25,
    sold: 18,
    condition: "used",
    description: "Sony PS4 console",
    specs: { storage: "500GB", color: "Black", region: "US" },
    slug: "ps4-console",
  },
  {
    name: "Xbox Series X",
    type: "console",
    price: 499,
    stock: 15,
    sold: 12,
    condition: "new",
    description: "Microsoft Xbox Series X",
    specs: { storage: "1TB", color: "Black", region: "US" },
    slug: "xbox-series-x",
  },
  {
    name: "Xbox Series S",
    type: "console",
    price: 299,
    stock: 20,
    sold: 10,
    condition: "new",
    description: "Microsoft Xbox Series S",
    specs: { storage: "512GB", color: "White", region: "US" },
    slug: "xbox-series-s",
  },
  {
    name: "Nintendo Switch",
    type: "console",
    price: 299,
    stock: 30,
    sold: 20,
    condition: "new",
    description: "Nintendo Switch console",
    specs: { storage: "32GB", color: "Red/Blue", region: "US" },
    slug: "nintendo-switch",
  },
  {
    name: "DualSense Controller",
    type: "accessory",
    price: 69,
    stock: 50,
    sold: 35,
    condition: "new",
    description: "PS5 controller",
    specs: { color: "White" },
    slug: "dualsense-controller",
  },
  {
    name: "Xbox Controller",
    type: "accessory",
    price: 59,
    stock: 40,
    sold: 28,
    condition: "new",
    description: "Xbox Series X controller",
    specs: { color: "Black" },
    slug: "xbox-controller",
  },
  {
    name: "The Last of Us Part I",
    type: "game",
    price: 69,
    stock: 30,
    sold: 25,
    condition: "new",
    description: "PS5 game",
    specs: { region: "US" },
    slug: "last-of-us-part1",
  },
  {
    name: "God of War Ragnarok",
    type: "game",
    price: 69,
    stock: 30,
    sold: 22,
    condition: "new",
    description: "PS5 game",
    specs: { region: "US" },
    slug: "god-of-war-ragnarok",
  },
  {
    name: "Zelda: Breath of the Wild",
    type: "game",
    price: 59,
    stock: 25,
    sold: 20,
    condition: "new",
    description: "Nintendo Switch game",
    specs: { region: "US" },
    slug: "zelda-breath-of-the-wild",
  },
];

const defaultImage = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Sony-PlayStation-4-PS4-wDualShock-4.jpg/500px-Sony-PlayStation-4-PS4-wDualShock-4.jpg",
];

const importData = async () => {
  try {
    await connectDB();

    // 1. Xoá dữ liệu cũ (Xoá thêm Order)
    await Brand.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany({ userId: TARGET_USER_ID });
    console.log("🗑️ Old data cleared");

    // 2. Tạo brand & category
    const createdBrands = await Brand.insertMany(brands);
    const createdCategories = await Category.insertMany(categories);

    // 3. Tạo Map
    const brandMap = {};
    createdBrands.forEach((b) => (brandMap[b.name] = b._id));
    const categoryMap = {};
    createdCategories.forEach((c) => (categoryMap[c.name] = c._id));

    // 4. Gán brand/category cho sản phẩm
    const productsWithRef = products.map((p) => {
      const nameLower = p.name.toLowerCase();
      const descLower = p.description.toLowerCase();

      let categoryId = categoryMap["Game"];
      if (p.type === "console") categoryId = categoryMap["Console"];
      if (p.type === "accessory") categoryId = categoryMap["Accessory"];

      let brandId = brandMap["Nintendo"];
      if (
        nameLower.includes("playstation") ||
        nameLower.includes("dualsense") ||
        descLower.includes("sony")
      ) {
        brandId = brandMap["Sony"];
      } else if (
        nameLower.includes("xbox") ||
        descLower.includes("microsoft")
      ) {
        brandId = brandMap["Microsoft"];
      }

      return {
        ...p,
        brand: brandId,
        category: categoryId,
        images: defaultImage,
      };
    });

    const createdProducts = await Product.insertMany(productsWithRef);
    console.log("✅ Products imported");

    // 5. TẠO FAKE ORDERS CHO USER
    const fakeOrders = [
      {
        userId: TARGET_USER_ID,
        status: OrderStatus.PROCESSING,
        shippingAddress: "123 Ly Thuong Kiet, HCM",
        paymentMethod: PaymentMethod.COD,
        items: [
          {
            productId: createdProducts[0]._id,
            name: createdProducts[0].name,
            quantity: 13,
            price: createdProducts[0].price,
          },
          {
            productId: createdProducts[5]._id,
            name: createdProducts[5].name,
            quantity: 10,
            price: createdProducts[5].price,
          },
        ],
      },
      {
        userId: TARGET_USER_ID,
        status: OrderStatus.DELIVERED,
        shippingAddress: "74 Pham Hung Q8 HCM",
        paymentMethod: PaymentMethod.CREDITCARD,
        items: [
          {
            productId: createdProducts[8]._id,
            name: createdProducts[8].name,
            quantity: 5,
            price: createdProducts[8].price,
          },
        ],
      },
      {
        userId: TARGET_USER_ID,
        status: OrderStatus.DELIVERED,
        shippingAddress: "312 NTMK Q1 HCM",
        paymentMethod: PaymentMethod.CREDITCARD,
        items: [
          {
            productId: createdProducts[1]._id,
            name: createdProducts[1].name,
            quantity: 4,
            price: createdProducts[1].price,
          },
          {
            productId: createdProducts[2]._id,
            name: createdProducts[2].name,
            quantity: 1,
            price: createdProducts[2].price,
          },
        ],
      },
      {
        userId: TARGET_USER_ID,
        status: OrderStatus.DELIVERED,
        shippingAddress: "220/123/12 PNT ,P21 Q,PN",
        paymentMethod: PaymentMethod.CREDITCARD,
        items: [
          {
            productId: createdProducts[9]._id,
            name: createdProducts[9].name,
            quantity: 9,
            price: createdProducts[9].price,
          },
          {
            productId: createdProducts[1]._id,
            name: createdProducts[1].name,
            quantity: 1,
            price: createdProducts[1].price,
          },
          {
            productId: createdProducts[2]._id,
            name: createdProducts[2].name,
            quantity: 11,
            price: createdProducts[2].price,
          },
        ],
      },
    ];

    // Tính totalPrice cho từng Order
    const ordersWithTotal = fakeOrders.map((order) => ({
      ...order,
      totalPrice: order.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    }));

    await Order.insertMany(ordersWithTotal);

    console.log("✅ Fake orders seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Error importing data:", err);
    process.exit(1);
  }
};

importData();
