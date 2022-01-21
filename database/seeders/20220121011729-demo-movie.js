'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let movieArray = [{
      id: 101,
      image: "https://robohash.org/ullamrecusandaeexcepturi.jpg?size=400x300&set=set1",
      title: 'The Avengers',
      releaseYear: 2012,
      ratingIMDB: 3,
      GenreId: 11
    }, {
      id: 102,
      image: "https://robohash.org/ullamrecudfdandaeexcepturi.jpg?size=400x300&set=set1",
      title: 'Iron Man 3',
      releaseYear: 2013,
      ratingIMDB: 5,
      GenreId: 12
    }, {
      id: 103,
      image: "https://robohash.org/ullamrecusandaeesdfxcepturi.jpg?size=400x300&set=set1",
      title: 'Wonder Woman',
      releaseYear: 2017,
      ratingIMDB: 3,
      GenreId: 13

    }, {
      id: 104,
      image: "https://robohash.org/ullamrecsdsafeusandaeexcepturi.jpg?size=400x300&set=set1",
      title: 'Black Widow',
      releaseYear: 2021,
      ratingIMDB: 4,
      GenreId: 11
    }]

    await queryInterface.bulkInsert('movies', movieArray, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('movies', null, {});
    
  }
};
