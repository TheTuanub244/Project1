"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(1),
      },
      rate: {
        type: Sequelize.DOUBLE,
      },
      description: {
        type: Sequelize.STRING,
      },
      itemID: {
        type: Sequelize.INTEGER(1),
        references: {
          model: "Items",
          key: "id",
        },
      },
      userID: {
        type: Sequelize.INTEGER(1),
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reviews");
  },
};
