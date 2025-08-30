const IUserRepository = require("src/Domain/Repositories/IUserRepository");
const UserModel = require("./models/UserModel");
const Name = require('src/Domain/User/ValueObjects/Name');
const Email = require('src/Domain/User/ValueObjects/Email');

class SequelizeUserRepository extends IUserRepository {
  async save(user) {
    const instance = await UserModel.create(user.toObject());

    return {
      id: instance.id,
      name: new Name(instance.name),
      email: new Email(instance.email),
      password: instance.password,
    };
  }

  async findById(id) {
    const instance = await UserModel.findByPk(id);

    if (!instance) return null;
    return {
      id: instance.id,
      name: new Name(instance.name),
      email: new Email(instance.email),
      password: instance.password,
    };
  }

  async findByEmail(email) {
    const instance = await UserModel.findOne({ where: { email } });

    if (!instance) return null;
    return {
      id: instance.id,
      name: new Name(instance.name),
      email: new Email(instance.email),
      password: instance.password,
    };
  }
}

module.exports = SequelizeUserRepository;
