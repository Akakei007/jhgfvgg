
const { Op } = require('sequelize');
const { sequelize, Category, Service, init } = require('./models');

(async () => {
  try {
    await init();

    const all = await Service.findAll();
    console.log('1. Все услуги:');
    all.forEach((s) => console.log(`   ${s.id}. ${s.name} — ${s.price}`));


    const one = await Service.findByPk(2);
    console.log('\n2. Услуга с id=2:', one.name);


    const expensive = await Service.findAll({
      where: { price: { [Op.gt]: 10000 } },
    });
    console.log('\n3. Услуги дороже 10000:');
    expensive.forEach((s) => console.log(`   ${s.name} — ${s.price}`));


    const withCategory = await Service.findAll({ include: Category });
    console.log('\n4. Услуги с категориями:');
    withCategory.forEach((s) => console.log(`   ${s.name} → ${s.Category.name}`));


    const created = await Service.create({
      name: 'Оформление документов',
      description: 'Свидетельство и справки',
      price: 3000,
      categoryId: 1,
    });
    console.log('\n5. Создана услуга:', created.name, '(id =', created.id + ')');
  } catch (err) {
    console.error('Ошибка:', err);
  } finally {
    await sequelize.close();
  }
})();
