module.exports = {
  users: [
    {
      username: 'alabert',
      password: 'password',
      firstname: 'burton',
      lastname: 'guster',
      email: 'gus@psych.net',
      phonenumber: '555555555',
      zipcode: '93101',
    },
    {
      username: 'cat catsby',
      password: 'password',
      firstname: 'sydney',
      lastname: 'kitteh',
      email: 'grump@grump.net',
      phonenumber: '555555555',
      zipcode: '60615',
    },
  ],
  userpayments: [
    {
      userId: 1,
      cardname: 'visa debit card',
      nameoncard: 'Burton Guster',
      billingaddress: '123 Fake Street, Santa Barbara, California',
      ccnumber: 1234567891024,
      ccsecuritycode: 123,
      ccexpiration: '2/25',
      zipcode: '93101',
    },
    {
      userId: 1,
      cardname: 'home depot credit card',
      nameoncard: 'Burton Guster',
      billingaddress: '123 Fake Street, Santa Barbara, California',
      ccnumber: 564654156156,
      ccsecuritycode: 654,
      ccexpiration: '1/24',
      zipcode: '93101',
    },
  ],
  useraddresses: [
    {
      userId: 1,
      street: '123 Fake Street, Santa Barbara, California',
      city: 'Santa Barbara',
      state: 'California',
      zipcode: '93101',
    },
  ],
};
