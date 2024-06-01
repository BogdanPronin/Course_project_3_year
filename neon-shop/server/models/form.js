const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Form = sequelize.define('Form', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'forms',
    timestamps: false
});

module.exports = Form;
