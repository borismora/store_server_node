'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM "Users";`
    );
    
    const addresses = await queryInterface.sequelize.query(
      `SELECT id FROM "Addresses";`
    );

    const userAddresses = users[0].map((user, _) => {
      const address = addresses[0][Math.floor(Math.random() * addresses[0].length)];

      return {
        userId: user.id,
        addressId: address.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    await queryInterface.bulkInsert(
      'UserAddress',
      userAddresses,
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserAddress', null, {})
  }
};
