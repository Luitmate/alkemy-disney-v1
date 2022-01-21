'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let genreArray = [{
      id: 11,
      name: "Action",
      image: "https://robohash.org/coneturporrorerum.jpg?size=400x300&set=set1",
    }, {
      id: 12,
      name: "Comedy",
      image: "https://robohash.org/courporrorerum.jpg?size=400x300&set=set1",  
    }, {
      id: 13,
      name: "Drama",
      image: "https://robohash.org/consecrporrorerum.jpg?size=400x300&set=set1",
    }, {
      id: 14,
      name: "Horror",
      image: "https://robohash.org/consectererum.jpg?size=400x300&set=set1",
    }]

     await queryInterface.bulkInsert('genres', genreArray, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('genres', null, {});
  }
};

