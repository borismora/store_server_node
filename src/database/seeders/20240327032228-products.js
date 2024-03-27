'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = [];

    for (let i = 0; i < 40; i++) {
      const product = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.url(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      products.push(product);
    }

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
