'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('facts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      _id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      user: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status: {
        allowNull: true,
        type: Sequelize.JSON
      },
      text: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      __v: {
        allowNull: true,
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      source: {
        allowNull: true,
        type: Sequelize.STRING
      },
      type: {
        allowNull: true,
        type: Sequelize.STRING
      },
      deleted: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      used: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('facts');
  }
};


