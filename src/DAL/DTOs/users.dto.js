export default class UsersDto {
  constructor(user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.username = user.username;
    this.role = user.role;
  }
}
