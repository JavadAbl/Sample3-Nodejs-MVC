export class CreateFactorDto {
  constructor({ count, status, description, products }) {
    this.count = count;
    this.status = status;
    this.description = description;
    this.products = products;
  }
}
