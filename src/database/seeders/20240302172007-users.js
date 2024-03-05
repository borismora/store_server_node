'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: faker.internet.userName(),
          email: faker.internet.email(),
          password_hash: await bcrypt.hash('123456', 8),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: faker.internet.userName(),
          email: faker.internet.email(),
          password_hash: await bcrypt.hash('123456', 8),
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
