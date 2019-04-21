'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
    return queryInterface.bulkInsert('Contacts', [{
      first: "Jesse",
      last: "Neumann",
      phone: "4806289999",
      email: "jesse@a.a",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      owner: 2
    }, {
      first: "Mom",
      last: "Neumann",
      phone: "4800089999",
      email: "mom@a.a",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      owner: 2
    }, {
      first: "Maleah",
      last: "Neumann",
      phone: "4803339999",
      email: "maleah@a.a",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      owner: 2
    }, {
      first: "Micah",
      last: "Neumann",
      phone: "4811189999",
      email: "micah@a.a",
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      owner: 2
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
    */
    return queryInterface.bulkDelete('Contacts', null, {});
  }
};
