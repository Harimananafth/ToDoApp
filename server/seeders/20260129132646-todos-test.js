'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Todos', [
      {
        title: 'Apprendre Express.js',
        done: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Installer pgAdmin sur Ubuntu',
        done: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Réussir mon premier Seeder',
        done: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Todos', null, {});
  }
};