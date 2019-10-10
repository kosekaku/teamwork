
const data = [
  {
    firstName: 'kose',
    lastName: 'uk45',
    email: 'uk45@gmail.com',
    password: '12345',
  },
  {
    firstName: 'kose',
    lastName: 'uk45',
    email: 'invalid gmail.com',
    password: '12345',
  },
  {
    firstName: 'kose',
    lastName: 'uk45',
    email: 'notFound@gmail.com',
    password: '12345',
  },
  {
    firstName: 'kose',
    lastName: 'uk45',
    email: 'uk45@gmail.com',
    password: '12345NotMatch',
  },

  // article test user, prefix at
  {
    atUserId: '1',
    atFirstName: 'koseTest',
    atLastName: 'uk45Test',
    atEmail: 'uk45Test@gmail.com',
    atPassword: '12345',
    atCreatedOn: new Date(),
  },
  {
    title: 'first article title',
    article: 'first article body',
  },
];

export default data;
