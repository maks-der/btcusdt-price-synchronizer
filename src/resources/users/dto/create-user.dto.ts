export class CreateUserDto {
  constructor(
    public fullName: string,
    public email: string,
    public password: string,
  ) {
  }
}
