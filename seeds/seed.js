// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Brand from "../models/brand.model.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";

dotenv.config({ path: ".env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

// Dữ liệu mẫu
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

// Ảnh mặc định cho tất cả sản phẩm
const defaultImage = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Sony-PlayStation-4-PS4-wDualShock-4.jpg/500px-Sony-PlayStation-4-PS4-wDualShock-4.jpg",
];

const importData = async () => {
  try {
    await connectDB();

    // Xoá dữ liệu cũ
    await Brand.deleteMany();
    await Category.deleteMany();
    await Product.deleteMany();

    // Tạo brand & category
    const createdBrands = await Brand.insertMany(brands);
    const createdCategories = await Category.insertMany(categories);

    // Tạo map brand/category id
    const brandMap = {};
    createdBrands.forEach((b) => (brandMap[b.name] = b._id));

    const categoryMap = {};
    createdCategories.forEach((c) => (categoryMap[c.name] = c._id));

    // Gán brand/category và ảnh mặc định cho product
    const productsWithRef = products.map((p) => {
      let categoryId =
        categoryMap[
          p.type === "console"
            ? "Console"
            : p.type === "accessory"
            ? "Accessory"
            : "Game"
        ];

      let brandId =
        brandMap[
          p.name.toLowerCase().includes("playstation")
            ? "Sony"
            : p.name.toLowerCase().includes("xbox")
            ? "Microsoft"
            : "Nintendo"
        ];

      return {
        ...p,
        brand: brandId,
        category: categoryId,
        images: defaultImage,
      };
    });

    await Product.insertMany(productsWithRef);

    console.log("✅ Data imported successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
