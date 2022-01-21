'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let associationsArray = [{
      CharacterId: 1,
      MovieId: 101
    } , {
      CharacterId: 1,
      MovieId: 102
    }, {
      CharacterId: 2,
      MovieId: 101
    }, {
      CharacterId: 3,
      MovieId: 104
    }, {
      CharacterId: 4,
      MovieId: 103
    }] 

     await queryInterface.bulkInsert('characterMovies', associationsArray, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('characterMovies', null, {});
  }
};