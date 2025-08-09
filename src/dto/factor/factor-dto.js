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
    this.statusTitle = FactorDto.getStatusTitle(status);
    this.description = description;
    this.createDateTime = createDateTime;
    this.submitDateTime = submitDateTime;
    this.products = products;
    this.userId = userId;
  }

  static getStatusTitle(status) {
    const statusMap = {
      1: "تایید نشده",
      2: "تایید شده",
      3: "لغو شده",
    };
    return statusMap[status] || "نامشخص"; // Return "unknown" if status is not in the map
  }
}
