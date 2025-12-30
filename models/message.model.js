const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define("Message", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    bpno: { type: DataTypes.STRING, allowNull: false },
    receiverbpno: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    groupid: { type: DataTypes.STRING, allowNull: true },
    messagetype: { type: DataTypes.STRING, allowNull: false },
    datetime: { type: DataTypes.STRING, allowNull: false },
    sentstatus: { type: DataTypes.INTEGER, allowNull: false },
}, {
    tableName: "messages",
    timestamps: false,
});

module.exports = Message;
