import CartRepository from "../repositories/cart.repository.js";
import ProductService from "./product.service.js";
import CartMapper from "../mappers/cart.mapper.js";
class CartService {
  async findCartByUserId(userId) {
    return await CartRepository.findCartByUserId(userId);
  }

  async removeProductFormCart(userId, productId) {
    const cart = await this.findCartByUserId(userId);

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
    }

    await cart.populate("items.productId");
    cart.totalPrice = this.#calculateTotalPrice(cart.items);

    const savedCart = await cart.save();
    return CartMapper.mapToDTO(savedCart);
  }
  async addProductToCart(userId, productId, quantity) {
    const product = await ProductService.checkAvailableProductStock(
      productId,
      quantity
    );
    const cart = await this.findCartByUserId(userId);

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].price =
        cart.items[itemIndex].quantity * product.price;
      cart.items[itemIndex].name = product.name;
    } else {
      cart.items.push({
        productId: product,
        quantity,
        price: product.price * quantity,
        name: product.name,
      });
    }
    await cart.populate("items.productId");
    cart.totalPrice = this.#calculateTotalPrice(cart.items);
    const savedCart = await cart.save();
    return CartMapper.mapToDTO(savedCart);
  }

  async updateCartItemQuantity(userId, productId, newQuantity) {
    // 1. Nếu số lượng <= 0, coi như hành động xóa sản phẩm
    if (newQuantity <= 0) {
      return await this.removeProductFromCart(userId, productId);
    }

    // 2. Kiểm tra kho (vẫn phải check xem kho có đủ 9 cái không)
    const product = await ProductService.checkAvailableProductStock(
      productId,
      newQuantity
    );

    const cart = await this.findCartByUserId(userId);
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      // 3. THAY THẾ số lượng (không dùng +=)
      cart.items[itemIndex].quantity = newQuantity;

      // 4. Tính lại giá dựa trên số lượng tuyệt đối mới
      cart.items[itemIndex].price = newQuantity * product.price;
      cart.items[itemIndex].name = product.name;
    } else {
      throw new Error("Sản phẩm không có trong giỏ hàng");
    }

    await cart.populate("items.productId");
    cart.totalPrice = this.#calculateTotalPrice(cart.items);

    const savedCart = await cart.save();
    return CartMapper.mapToDTO(savedCart);
  }

  #recalculateCartTotal(cart) {
    cart.populate("items.product");

    const total = cart.items.reduce((sum, item) => {
      const product = item.product;
      if (!product) return sum;

      return sum + price * item.quantity;
    }, 0);

    cart.totalPrice = total;

    return cart;
  }
  #calculateTotalPrice(items) {
    return items.reduce((total, item) => {
      const product = item.productId;
      if (!product) return total;

      const finalPrice = product.price * (1 - (product.discount || 0) / 100);
      return total + finalPrice * item.quantity;
    }, 0);
  }
}

export default new CartService();
