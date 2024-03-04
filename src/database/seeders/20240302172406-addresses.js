'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Addresses',
      [
        {
          id: 1,
          city: 'São Paulo',
          state: 'SP',
          neighborhood: 'Centro',
          country: 'Brasil',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 2,
          city: 'Rio de Janeiro',
          state: 'RJ',
          neighborhood: 'Copacabana',
          country: 'Brasil',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Addresses', null, {})
  }
};
