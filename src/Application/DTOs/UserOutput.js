class UserOutput {
  constructor(user) {
    if (!user) throw new Error("User is undefined");

    const plainUser =
      typeof user.toObject === "function" ? user.toObject() : user;

    this.user = {
      id: plainUser.id,
      name: plainUser.name.value,
      email: plainUser.email.value,
    };
  }
}

module.exports = UserOutput;
