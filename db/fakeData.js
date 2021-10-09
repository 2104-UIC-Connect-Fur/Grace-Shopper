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
      username: 'catcatsby',
      password: 'password',
      firstname: 'sydney',
      lastname: 'kitteh',
      email: 'grump@grump.net',
      phonenumber: '555555555',
      zipcode: '60615',
      isAdmin: true,
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
  items: [
    {
      title: 'Babe Ruths Jersey',
      description: 'Game worn jersey from 1928-1930 !!!',
      price: 599999,
      inventoryquantity: 5,
    },
    {
      title: 'Air Jordan 5 Off-White',
      description: '2020 Chicago All Star Jordan 5 Special Release !!',
      price: 110000,
      inventoryquantity: 2,
    },
    {
      title: 'AMD Ryzen 5950X',
      description: 'AMD CPU. Brand New!! Never seen and never used!',
      price: 899999,
      inventoryquantity: 1,
    },
    {
      title: "Michael Meidenbauer's Jersey",
      description: 'Worn in high school. Smells pretty bad tbh.',
      price: 10000,
      inventoryquantity: 1,
    },
    {
      title: 'More rare stuff',
      description: 'I mean, just wow',
      price: 500000,
      inventoryquantity: 2,
    },
    {
      title: "Kuzco's Poison",
      description: 'The poison chosen specifically to kill Kuzco.',
      price: 999999,
      inventoryquantity: 1,
    },
    {
      title: 'One eyed cat',
      description: 'Pretty nice!',
      price: 250000,
      inventoryquantity: 1,
    },
    {
      title: 'Two eyed cat',
      description: 'Plotting your demise at this very moment.',
      price: 250000,
      inventoryquantity: 1,
    },
    {
      title: 'Broken headphones',
      description: "Don't judge a book by it's cover.",
      price: 20000,
      inventoryquantity: 1,
    },
  ],
  imagesOfItems: [
    {
      itemId: 1,
      url: '/images/BabeRuthJersey.png',
      description: 'Babe Ruth ate so many hot dogs in this bad boy!',
      alttext: 'Babe Ruth = Hot Dogs',
    },
    {
      itemId: 1,
      url: '/images/babe_ruth_jersey_2.jpeg',
      description: 'Babe Ruth ate so many hot dogs in this bad boy!',
      alttext: 'Babe Ruth = Hot Dogs',
    },
    {
      itemId: 2,
      url: '/images/Jordan5OffWhite.png',
      description: '1 of 1 ! !',
      alttext: 'Never worn!',
    },
    {
      itemId: 3,
      url: '',
      description: 'AMD Ryzen 5950X',
      alttext: 'In Transit',
    },
  ],
  categories: [
    {
      name: 'Sports',
      description: 'Rare sports memorabilia!',
    },
    {
      name: 'Shoes',
      description: 'Exclusive Shoes',
    },
    {
      name: 'Cats',
      description: 'Lil fuzzers.',
    },
    {
      name: 'Antiques',
      description: 'You mean junk?',
    },
    {
      name: 'Hats',
      description: 'For your noggin.',
    },
    {
      name: 'Random shit',
      description: 'Would you look at that',
    },
    {
      name: 'Cars',
      description: 'Vroom.',
    },
    {
      name: 'Bikes',
      description: 'Half as many wheels, twice as much fun.',
    },
  ],
  itemscategories: [
    {
      itemId: 1,
      categoryId: 1,
    },
    {
      itemId: 2,
      categoryId: 2,
    },
    {
      itemId: 3,
      categoryId: 1,
    },
  ],
  discounts: [
    {
      name: 'newuser',
      type: 'fixed',
      description: 'Introductory offer to new users',
      amount: 1000,
    },
    {
      name: 'tistheseason',
      type: 'fixed',
      description: 'seasonal discount',
      amount: 2000,
    },
  ],
  orders: [
    {
      userId: 1,
      total: 5243,
      complete: true,
      street: '777 Jackpot Avenue',
      apartment: '11',
      city: 'Atlantic City',
      state: 'New Jersey',
      zipcode: '08201',
      nameoncard: 'Berry Johnson',
      billingaddress: '777 Jackpot Avenue, 11, Atlantic City, NJ 08201',
      ccnumber: 123456789,
      ccsecuritycode: 555,
      ccexpiration: '10/25',
      cczipcode: '08201',
    },
    {
      userId: 2,
      total: 10253,
      complete: true,
      street: '123 Main Street',
      city: 'Wisconsin Dells',
      state: 'Wisconsin',
      zipcode: '53965',
      nameoncard: 'Joey Gouda',
      billingaddress: '123 Main Street, Wisconsin Dells, WI 53965',
      ccnumber: 123456789,
      ccsecuritycode: 345,
      ccexpiration: '1/24',
      cczipcode: '54965',
    },
    {
      userId: 1,
      total: 1233,
      complete: false,
      street: '777 Jackpot Avenue',
      apartment: '11',
      city: 'Atlantic City',
      state: 'New Jersey',
      zipcode: '08201',
      nameoncard: 'Berry Johnson',
      billingaddress: '777 Jackpot Avenue, 11, Atlantic City, NJ 08201',
      ccnumber: 123456789,
      ccsecuritycode: 555,
      ccexpiration: '10/25',
      cczipcode: '08201',
    },
  ],
  ordersitems: [
    {
      orderId: 1,
      itemId: 1,
      quantity: 5,
      priceatpurchase: 1100,
    },
    {
      orderId: 1,
      itemId: 2,
      quantity: 1,
      priceatpurchase: 556,
    },
    {
      orderId: 2,
      itemId: 2,
      quantity: 15,
      priceatpurchase: 542,
    },
    {
      orderId: 3,
      itemId: 2,
      quantity: 2,
      priceatpurchase: 600,
    },
    {
      orderId: 3,
      itemId: 1,
      quantity: 4,
      priceatpurchase: 340,
    },
  ],
  reviews: [
    {
      itemId: 1,
      userId: 1,
      title: 'What a jersey!',
      bodytext: 'You can still see all the mustard stains!',
    },
    {
      itemId: 2,
      userId: 2,
      title: 'Gorgeous shoes',
      bodytext: 'I still cant hit a jumper, but at least I look good.',
    },
  ],
  queries: [
    {
      priceLow: 100,
      priceHigh: 50000,
      categoryIds: [
        1,
      ],
    },
    {
      priceLow: 100,
      priceHigh: 100000000,
      categoryIds: [
        2,
      ],
    },
    {
      priceLow: 100,
      priceHigh: 50000,
      categoryIds: [
        1,
        2,
      ],
    },
    {
      categoryIds: [
        2,
      ],
    },
    {
      searchString: 'jersey',
    },
    {
    },
  ],
};
