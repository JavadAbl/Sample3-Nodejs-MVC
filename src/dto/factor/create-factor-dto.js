export class CreateFactorDto {
  constructor({ count, description, products }) {
    this.count = count;
    this.description = description;
    this.products = products;
  }
}
