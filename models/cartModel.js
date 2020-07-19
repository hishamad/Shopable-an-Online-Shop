class Cart {
  constructor(cart) {
    this.products = cart.products || {};
    this.totalProducts = cart.totalProducts || 0;
    this.totalPrice = cart.totalPrice || 0;
  }

  add(product, id) {
    let storedProducts = this.products[id];
    if (!storedProducts) {
      storedProducts = this.products[id] = {
        product: product,
        quantity: 0,
        price: 0,
      };
    }
    storedProducts.quantity++;
    storedProducts.price =
      (
        Math.round(
          storedProducts.product.price * storedProducts.quantity * 100
        ) / 100
      ).toFixed(2) * 1;
    this.totalProducts++;
    this.totalPrice += storedProducts.product.price;
    this.totalPrice = (Math.round(this.totalPrice * 100) / 100).toFixed(2) * 1;
  }

  productsArray() {
    const arr = [];
    for (const id in this.products) {
      arr.push(this.products[id]);
    }
    return arr;
  }
}
module.exports = Cart;
