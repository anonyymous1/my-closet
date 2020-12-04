'use strict';

const { sequelize } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return queryInterface.changeColumn("favorites", "sneakerId", {
    //   type: Sequelize.INTEGER
    // } )
    await queryInterface.removeColumn("favorites", "sneakerId")
    return queryInterface.addColumn("favorites", "sneakerId", Sequelize.INTEGER)
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    // return queryInterface.changeColumn("favorites", "sneakerId", {
    //   type: Sequelize.TEXT
    // } ) 
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
