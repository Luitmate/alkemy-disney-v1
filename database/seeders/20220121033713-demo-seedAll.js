'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    let userArray = [{
      id: 1,
      email: 'lucas1@gmail.com',
      password: 'lucaspassword1'
    }, {
      id: 2,
      email: 'lucas2@gmail.com',
      password: 'lucaspassword2'
    }, {
      id: 3,
      email: 'lucas3@gmail.com',
      password: 'lucaspassword3'
    }, {
      id: 4,
      email: 'lucas4@gmail.com',
      password: 'lucaspassword4'
    }
  ]

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

    let characterArray = [{
      id: 1,
      image: "https://robohash.org/consecteturporrorerum.jpg?size=400x300&set=set1",
      name: "Robert Downey",
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

     await queryInterface.bulkInsert('users', userArray, {});
     await queryInterface.bulkInsert('genres', genreArray, {});
     await queryInterface.bulkInsert('movies', movieArray, {});
     await queryInterface.bulkInsert('characters', characterArray, {});
     await queryInterface.bulkInsert('characterMovies', associationsArray, {});
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('genres', null, {});
    await queryInterface.bulkDelete('movies', null, {});
    await queryInterface.bulkDelete('characters', null, {});
    await queryInterface.bulkDelete('characterMovies', null, {});
    

  }
};
