'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
        return queryInterface.renameColumn('favorites', 'styleId', 'sneakerId');
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
