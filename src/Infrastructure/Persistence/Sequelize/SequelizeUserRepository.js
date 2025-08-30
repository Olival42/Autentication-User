// src/Infrastructure/Persistence/Sequelize/SequelizeUserRepository.js
const IUserRepository = require('src/Domain/Repositories/IUserRepository');
const UserModel = require('./models/UserModel');

class SequelizeUserRepository extends IUserRepository {
    async save(user) {
        const instance = await UserModel.create(user.toObject());
        // Retorna objeto simples
        return {
            id: instance.id,
            name: instance.name,
            email: instance.email,
            password: instance.password
        };
    }

    async findById(id) {
        const instance = await UserModel.findByPk(id);
        if (!instance) return null;
        return {
            id: instance.id,
            name: instance.name,
            email: instance.email,
            password: instance.password
        };
    }

    async findByEmail(email) {
        const instance = await UserModel.findOne({ where: { email } });
        if (!instance) return null;
        return {
            id: instance.id,
            name: instance.name,
            email: instance.email,
            password: instance.password
        };
    }
}

module.exports = SequelizeUserRepository;
