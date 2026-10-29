// Наполнение БД тестовыми данными: create + bulkCreate
const { sequelize, Category, Service, init } = require('./models');

(async () => {
  try {
    await init({ force: true });
    console.log('Таблицы созданы (sync)');

    // create() — одна запись
    await Category.create({ name: 'Организация похорон' });

    // bulkCreate() — несколько записей
    await Category.bulkCreate([
      { name: 'Кремация' },
      { name: 'Памятники' },
      { name: 'Венки и цветы' },
    ]);

    await Service.bulkCreate([
      { name: 'Катафалк', description: 'Перевозка по городу', price: 5000, categoryId: 1 },
      { name: 'Кремация стандартная', description: 'Включая урну', price: 15000, categoryId: 2 },
      { name: 'Гранитный памятник', description: 'Гравировка в комплекте', price: 45000, categoryId: 3 },
      { name: 'Венок ритуальный', description: 'Живые цветы', price: 2500, categoryId: 4 },
    ]);

    console.log('Добавлено: 4 категории, 4 услуги');
  } catch (err) {
    console.error('Ошибка:', err);
  } finally {
    await sequelize.close();
  }
})();
