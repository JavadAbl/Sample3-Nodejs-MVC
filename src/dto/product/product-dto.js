export class ProductDto {
  constructor({
    id,
    name,
    price,
    stock,
    image,
    description,
    factors,
    createdAt,
    updatedAt,
  }) {
    this.id = id; // Unique identifier for the product
    this.name = name; // Name of the product
    this.price = price; // Original price of the product
    this.stock = stock; // Available stock for the product
    this.image = image || null; // Optional image URL for the product
    this.description = description || null; // Optional description of the product
    this.factors = factors || []; // Array of factors associated with the product
    this.createdAt = createdAt; // Timestamp of when the product was created
    this.updatedAt = updatedAt; // Timestamp of the last update to the product
  }
}
