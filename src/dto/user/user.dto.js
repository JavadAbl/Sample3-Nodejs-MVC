export class UserDto {
  constructor({ email, name, createdAt, updatedAt }) {
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
