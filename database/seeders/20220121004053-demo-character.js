'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    let characterArray = [{
      id: 1,
      image: "https://robohash.org/consecteturporrorerum.jpg?size=400x300&set=set1",
      name: "Robert Downey Jr.",
      age: 56,
      weight: 80,
      story: "In congue. Etiam justo. Etiam pretium iaculis justo. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.",
    }, {
      id: 2,
      image: "https://robohash.org/earumquoaperiam.jpg?size=400x300&set=set1",
      name: "Chris Evans",
      age: 40,
      weight: 70,
      story: "Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula",
    }, {
      id: 3,
      image: "https://robohash.org/officiispossimusipsam.jpg?size=400x300&set=set1",
      name: "Scarlett Johansson",
      age: 37,
      weight: 68,
      story: "Donec ut dolor utpat, quam pedse lobortis ligula",
    }, {
      id: 4,
      image: "https://robohash.org/beataearchitectoperspiciatis.jpg?size=400x300&set=set1",
      name: "Gal Gadot",
      age: 36,
      weight: 69,
      story: "Donec ut dolor utpat, quam pede lobortis ligula",
    }]

     await queryInterface.bulkInsert('characters', characterArray, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('characters', null, {});
  }
};
