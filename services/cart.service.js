import CartRepository from "../repositories/cart.repository.js";
import ProductService from "./product.service.js";
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

  return await cart.save();
}
  async addProductToCart(userId, productId, quantity) {
    const product = await ProductService.checkAvailableProductStock(
      productId,
      quantity,
    );

    const cart = await this.findCartByUserId(userId);

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId.toString(),
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
      cart.items[itemIndex].name = product.name;
    } else {
      cart.items.push({
        productId: product,
        quantity,
        name: product.name
      });
    }
    await cart.populate("items.productId");
    cart.totalPrice = this.#calculateTotalPrice(cart.items);
    return await cart.save();
  }

  async mergeCart(userId, guestItems) { }

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
