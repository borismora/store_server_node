'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const commonPassword = await bcrypt.hash('123456', 8);

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: faker.internet.userName(),
          email: faker.internet.email(),
          password_hash: commonPassword,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: faker.internet.userName(),
          email: faker.internet.email(),
          password_hash: commonPassword,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: faker.internet.userName(),
          email: faker.internet.email(),
          password_hash: commonPassword,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
