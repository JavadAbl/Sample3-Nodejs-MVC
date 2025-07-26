export class RegisterDto {
  constructor({ email, password, name }) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
}
