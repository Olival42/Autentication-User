const AuthOutput = require("../../DTOs/AuthOutput");
const InvalidCredentialsException = require("../../../Domain/Exceptions/InvalidCredentialsException");
const User = require("../../../Domain/User/User");

class LoginUser {
  constructor(userRepository, jwtProvider) {
    this.userRepository = userRepository;
    this.jwtProvider = jwtProvider;
  }

  async execute(input) {
    const existingUserData = await this.userRepository.findByEmail(input.email);

    if (!existingUserData) {
      throw new InvalidCredentialsException("Invalid email or password.");
    }

    const user = new User(
      existingUserData.name?.value || existingUserData.name,
      existingUserData.email?.value || existingUserData.email,
      existingUserData.password,
      existingUserData.id,
      true
    );

    const isPasswordValid = await user.comparePassword(input.password);
    if (!isPasswordValid) {
      throw new InvalidCredentialsException("Invalid email or password.");
    }

    const token = this.jwtProvider.generateToken({
      userId: user.id,
      email: user.email.value,
    });

    return new AuthOutput(token, {
      id: user.id,
      name: user.name instanceof Object ? user.name.value : user.name,
      email: user.email instanceof Object ? user.email.value : user.email,
    });
  }
}

module.exports = LoginUser;
