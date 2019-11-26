'use strict';

let data = {
  people: [
    {
      id: 1,
      firstName: 'Sarah',
      lastName: 'Smalls',
      birthday: new Date('02/13/2020'),
      team: 1,
      likes: 'cats',
    },
    {
      id: 2,
      firstName: 'Rene',
      lastName: 'Lefridge',
      birthday: new Date('03/04/2020'),
      team: 2,
      likes: 'dogs',
    },
    {
      id: 3,
      firstName: 'Billy',
      lastName: 'Banks',
      birthday: new Date('12/21/2020'),
      team: 3,
      likes: 'both',
    },
    {
      id: 4,
      firstName: 'Jesse',
      lastName: 'Davis',
      birthday: new Date('04/07/2020'),
      team: 1,
      likes: 'both',
    },
  ],

  teams: [
    {
      id: 1,
      name: 'Yellow Rhino',
      color: 'yellow',
    },
    {
      id: 2,
      name: 'Red Heron',
      color: 'red',
    },
    {
      id: 3,
      name: 'Blue Otter',
      color: 'blue',
    },
  ],
};

module.exports = data;
