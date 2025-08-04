export class FactorDto {
  constructor({
    id,
    price,
    count,
    status,
    description,
    createDateTime,
    submitDateTime,
    userId,
    products,
  }) {
    this.id = id;
    this.price = price;
    this.count = count;
    this.status = status;
    this.description = description;
    this.createDateTime = createDateTime;
    this.submitDateTime = submitDateTime;
    this.products = products;
    this.userId = userId;
  }
}
