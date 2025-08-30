const createApp = require('./app');
const sequelize = require('./Infrastructure/Persistence/Sequelize/database');
const config = require('./config/index');

const PORT = config.server.port;

async function startServer() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('Database connected and synchronized!');

        const app = await createApp(); // Cria app com Redis e tudo

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Access API at http://localhost:${PORT}`);
            console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
