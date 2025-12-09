const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Auth = sequelize.define("Auth", {
    socketid: { type: DataTypes.STRING, primaryKey: true },
    userid: { type: DataTypes.STRING, allowNull: false },
    connect: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
}, {
    tableName: "auths",
    timestamps: false,
});

module.exports = Auth;
