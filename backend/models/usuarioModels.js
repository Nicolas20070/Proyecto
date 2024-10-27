const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('proyecto', 'root', '1029280764.', {
  host: 'localhost',
  dialect: 'mysql'
});

const Usuario = sequelize.define('Usuario', {
  nombre: DataTypes.STRING,
  email: DataTypes.STRING,
  // Otros campos según tu tabla Usuarios...
});

module.exports = Usuario;