export class UserDto {
  constructor({ id, email, name, createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
