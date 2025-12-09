const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chat_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

(async () => {
    try {
        await sequelize.authenticate()
            .then(() => console.log('✅ MySQL connected!'))
            .catch(err => console.error('❌ Connection error:', err));
        await sequelize.sync({ alter: true }); // sync models to DB
    } catch (error) {
        console.error("❌ MySQL connection failed:", error.message);
    }
})();

module.exports = sequelize;
