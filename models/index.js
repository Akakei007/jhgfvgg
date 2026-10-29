
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'ritual.db',
  logging: false,
});

const Category = require('./Category')(sequelize);
const Service = require('./Service')(sequelize);


Category.hasMany(Service, { foreignKey: 'categoryId' });
Service.belongsTo(Category, { foreignKey: 'categoryId' });


async function init(options = {}) {
  await sequelize.sync(options);
}

module.exports = { sequelize, Category, Service, init };
