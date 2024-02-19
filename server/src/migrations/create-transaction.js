"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(1),
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      paymentMethod: {
        type: Sequelize.STRING,
      },
      address: {
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
      transactionStateID: {
        type: Sequelize.INTEGER(1),
        references: {
          model: "TransactionStates",
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
    await queryInterface.dropTable("Transactions");
  },
};
