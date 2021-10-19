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
      isAdmin: false,
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
      title: "Babe Ruth's Jersey",
      description: 'Game worn jersey from 1928-1930 !!!',
      price: 599999,
      inventoryquantity: 5,
      active: true,
    },
    {
      title: 'Air Jordan 5 Off-White',
      description: '2020 Chicago All Star Jordan 5 Special Release !!',
      price: 110000,
      inventoryquantity: 2,
      active: true,
    },
    {
      title: 'AMD Ryzen 5950X',
      description: 'AMD CPU. Brand New!! Never seen and never used!',
      price: 899999,
      inventoryquantity: 1,
      active: true,
    },
    {
      title: "Michael Meidenbauer's Jersey",
      description: 'Worn in high school. Smells pretty bad tbh.',
      price: 10000,
      inventoryquantity: 1,
      active: true,
    },
    {
      title: 'More rare stuff',
      description: 'I mean, just wow',
      price: 500000,
      inventoryquantity: 2,
      active: true,
    },
    {
      title: "Kuzco's Poison",
      description: 'That poison?',
      price: 999999,
      inventoryquantity: 1,
      active: true,
    },
    {
      title: 'One eyed cat',
      description:
        'What this cat lacks in eyes she makes up for in sheer adorability and gooberousness. This cat will melt your heart and eat your headphone cables.',
      price: 250000,
      inventoryquantity: 1,
      active: true,
    },
    {
      title: 'Two eyed cat',
      description:
        'In the darkness lies, coiled, the grumpiest cat in existence. She rises to greet you, shouting like her grumpiest self yet quickly becoming her cuddliest self.',
      price: 250000,
      inventoryquantity: 1,
      active: true,
    },
    {
      title: 'HIFIMAN Ananda',
      description:
        "These things will turn you into a headphone snob. But you won't care.",
      price: 200000,
      inventoryquantity: 1,
      active: true,
    },
    {
      title: 'Bob Dylan: The Freewheelin Bob Dylan',
      description: 'Original vinyl pressing from 1963. Includes bonus tracks.',
      price: 3500000,
      inventoryquantity: 3,
      active: true,
    },
    {
      title: 'George Washington Stamp',
      description: 'Originally worth 3 cents. Can you believe it?',
      price: 90000000,
      inventoryquantity: 1,
      active: true,
    },
    {
      title: 'Apple II Computer',
      description: 'One of the original personal computers.',
      price: 250000,
      inventoryquantity: 5,
      active: true,
    },
    {
      title: 'Michael Jordan Rookie Card',
      description:
        'Autographed Michael Jordan rookie card from 1986-1987 NBA season.',
      price: 9500000,
      inventoryquantity: 1,
      active: true,
    },
    {
      title: 'Kobe Bryant Rookie Card',
      description: 'Kobe Bryant rookie card from 1996-1997 NBA season.',
      price: 500000,
      inventoryquantity: 2,
      active: true,
    },
    {
      title: 'Apple Lisa Computer',
      description:
        'Original Apple Lisa computer model. Still in excellent working condition.',
      price: 2500000,
      inventoryquantity: 3,
      active: true,
    },
    {
      title: 'Madvillain: Madvillainy',
      description: 'MF Doom + Madlib. Original vinyl. Sealed.',
      price: 30000,
      inventoryquantity: 5,
      active: true,
    },
    {
      title: 'Scottie Pippen Team USA Jersey',
      description: 'Scottie Pippen Team USA jersey from the 1992 Dream Team.',
      price: 50000,
      inventoryquantity: 4,
      active: true,
    },
    {
      title: 'Vintage Adidas Rod Lavers',
      description:
        'Rare vintage release of 1970s-style Adidas Rod Laver tennis shoes.',
      price: 17500,
      inventoryquantity: 10,
      active: true,
    },
    {
      title: 'First-Edition Don Quixote',
      description:
        'Incredibly rare first-edition copy of Don Quixote by Miguel de Cervantes.',
      price: 2000000,
      inventoryquantity: 3,
      active: true,
    },
    {
      title: 'Nic Cage Pillow',
      description:
        "Who wouldn't want to rest their head on Nic Cage's mug?",
      price: 350000,
      inventoryquantity: 10,
      active: true,
    },
    {
      title: 'Towering Pillar of Hats',
      description:
        'It is a stack of three hats, consisting of a boater with a black ribbon perched atop a Noble Amassment of Hats.',
      price: 150000,
      inventoryquantity: 4,
      active: true,
    },
    {
      title: 'Cadillac 16',
      description:
        'A concept car so powerful it never made it into production. This is one of five models ever made.',
      price: 50000000,
      inventoryquantity: 1,
      active: true,
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
      description:
        "When The Babe wasn't smashing dingers he was smashing dogs. Hot dogs, that is.",
      alttext: 'Babe Ruth = Hot Dogs',
    },
    {
      itemId: 2,
      url: '/images/Jordan5OffWhite.png',
      description: '1 of 1 ! !',
      alttext: 'Never worn!',
    },
    {
      itemId: 7,
      url: '/images/uno.png',
      description: 'Pretty nice!',
      alttext: 'Big fan of treats.',
    },
    {
      itemId: 8,
      url: '/images/sydney-face.png',
      description: 'Plotting your demise at this very moment.',
      alttext: '"Everyone sucks but not kitteh. -Sydney"',
    },
    {
      itemId: 9,
      url: '/images/ananda.png',
      description: 'These are some big-ass headphones.',
      alttext: 'Worth.',
    },
    {
      itemId: 6,
      url: '/images/cronk.png',
      description:
        "Oh, right. The poison. The poison for Kuzco. The poison chosen especially to kill Kuzco. Kusco's poison.",
      alttext: 'Pull the lever, Cronk.',
    },
    {
      itemId: 10,
      url: '/images/bobdylan.jpg',
      description: "Rare vinyl copy of Bob Dylan's Freewheelin Bob Dylan",
      alttext: 'Bob Dylan record',
    },
    {
      itemId: 11,
      url: '/images/washington.jpg',
      description: 'The first president on a stamp.',
      alttext: 'George Washington on a stamp.',
    },
    {
      itemId: 12,
      url: '/images/Apple_II.jpeg',
      description: 'Vintage Apple II computer.',
      alttext: 'Vintage Apple II computer',
    },
    {
      itemId: 13,
      url: '/images/mjrookiecard.jpeg',
      description: '1986 MJ Rookie Card. Like-new condition.',
      alttext: '1986 MJ rookie basketball card',
    },
    {
      itemId: 14,
      url: '/images/Kobe.jpg',
      description: 'Kobe Bryant rookie card',
      alttext: 'Kobe Brynant rookie basketball card',
    },
    {
      itemId: 15,
      url: '/images/lisa2.jpeg',
      description: 'Apple Lisa 2 computer.',
      alttext: 'Apple Lisa 2 computer.',
    },
    {
      itemId: 16,
      url: '/images/Madvillain.jpeg',
      description: 'Sealed copy of Madvillainy vinyl album',
      alttext: 'Sealed copy of Madvillainy vinyl album',
    },
    {
      itemId: 17,
      url: '/images/scottie.jpg',
      description: 'Scottie Pippen 1992 Team USA jersey',
      alttext: 'New Scottie Pippen 1992 Team USA jersey',
    },
    {
      itemId: 18,
      url: '/images/rodlavers.jpeg',
      description: 'Vintage Adidas Rod Lavers',
      alttext: 'Vintage release of Adidas Rod Laver tennis shoes',
    },
    {
      itemId: 19,
      url: '/images/don-quixote.jpeg',
      description: 'Leatherbound first-edition Don Quixote',
      alttext: 'Leatherbound first-edition Don Quixote book',
    },
    {
      itemId: 20,
      url: '/images/nic_cage.png',
      description: "Sorry boss, but there's only two men I trust. One of them's me. The other's not you.",
      alttext: "I'm a vampire! I'm a vampire! I'm a vampire!",
    },
    {
      itemId: 21,
      url: '/images/towering_Pillar_of_Hats.png',
      description: 'Tarnish notte the majesty of my TOWER of HATS.',
      alttext: 'TF24ever',
    },
    {
      itemId: 22,
      url: '/images/cadillac_16.png',
      description: 'The engine was said to produce a minimum of 1,000HP.',
      alttext: 'vroom',
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
    {
      name: 'Music',
      description: 'Take a listen.',
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
    {
      itemId: 10,
      categoryId: 9,
    },
    {
      itemId: 11,
      categoryId: 6,
    },
    {
      itemId: 12,
      categoryId: 4,
    },
    {
      itemId: 13,
      categoryId: 1,
    },
    {
      itemId: 14,
      categoryId: 1,
    },
    {
      itemId: 15,
      categoryId: 4,
    },
    {
      itemId: 16,
      categoryId: 9,
    },
    {
      itemId: 17,
      categoryId: 1,
    },
    {
      itemId: 18,
      categoryId: 2,
    },
    {
      itemId: 19,
      categoryId: 6,
    },
    {
      itemId: 20,
      categoryId: 6,
    },
    {
      itemId: 21,
      categoryId: 5,
    },
    {
      itemId: 22,
      categoryId: 7,
    },
    {
      itemId: 7,
      categoryId: 3,
    },
    {
      itemId: 8,
      categoryId: 3,
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
      categoryIds: [1],
    },
    {
      priceLow: 100,
      priceHigh: 100000000,
      categoryIds: [2],
    },
    {
      priceLow: 100,
      priceHigh: 50000,
      categoryIds: [1, 2],
    },
    {
      categoryIds: [2],
    },
    {
      searchString: 'jersey',
    },
    {},
  ],
};
