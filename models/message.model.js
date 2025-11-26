const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define("Message", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bpNo: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    messageType: { type: DataTypes.STRING, allowNull: false },
    dateTime: { type: DataTypes.STRING, allowNull: false },
    sentStatus: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: "messages",
    timestamps: false,
});

(async () => {
    try {
        await sequelize.authenticate()
            .then(() => console.log('✅ PostgreSQL connected!'))
            .catch(err => console.error('❌ Connection error:', err));
        await sequelize.sync({ alter: true }); // sync models to DB
    } catch (error) {
        console.error("❌ MySQL connection failed:", error.message);
    }
})();


module.exports = Message;
