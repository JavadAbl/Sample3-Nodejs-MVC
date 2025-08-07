export class FactorDto {
  constructor({
    id,
    price,
    status,
    description,
    createDateTime,
    submitDateTime,
    userId,
    products,
  }) {
    this.id = id;
    this.price = price;
    this.status = status;
    this.description = description;
    this.createDateTime = createDateTime;
    this.submitDateTime = submitDateTime;
    this.products = products;
    this.userId = userId;
  }
}
