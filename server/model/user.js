const Sequelize = require('sequelize')
const sequelize = require('./index')
const User = sequelize.define('userinfos', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING(50)
  },
  age: {
    type: Sequelize.INTEGER
  },
  address: {
    type: Sequelize.STRING(50)
  },
  is_delete: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = User
