export class CreateProductDto {
  constructor({ name, price, stock, image, description }) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.image = image;
    this.description = description;
  }
}
