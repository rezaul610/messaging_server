const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define("messages", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bpNo: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    messageType: { type: DataTypes.STRING, allowNull: false },
    dateTime: { type: DataTypes.STRING, allowNull: false },
    sentStatus: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Message;
