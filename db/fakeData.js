module.exports = {
  users: [
    {
      username: "alabert",
      password: "password",
      firstname: "burton",
      lastname: "guster",
      email: "gus@psych.net",
      phonenumber: "555555555",
      zipcode: "93101",
    },
    {
      username: "cat catsby",
      password: "password",
      firstname: "sydney",
      lastname: "kitteh",
      email: "grump@grump.net",
      phonenumber: "555555555",
      zipcode: "60615",
    },
  ],
  userpayments: [
    {
      userId: 1,
      cardname: "visa debit card",
      nameoncard: "Burton Guster",
      billingaddress: "123 Fake Street, Santa Barbara, California",
      ccnumber: 1234567891024,
      ccsecuritycode: 123,
      ccexpiration: "2/25",
      zipcode: "93101",
    },
    {
      userId: 1,
      cardname: "home depot credit card",
      nameoncard: "Burton Guster",
      billingaddress: "123 Fake Street, Santa Barbara, California",
      ccnumber: 564654156156,
      ccsecuritycode: 654,
      ccexpiration: "1/24",
      zipcode: "93101",
    },
  ],
  useraddresses: [
    {
      userId: 1,
      street: "123 Fake Street, Santa Barbara, California",
      city: "Santa Barbara",
      state: "California",
      zipcode: "93101",
    },
  ],
  items: [
    {
      id: 1,
      title: "Babe Ruths Jersey",
      description: "Game worn jersey from 1928-1930 !!!",
      price: 5.99,
      inventoryquantity: 5,
    },
    {
      id: 2,
      title: "Air Jordan 5 Off-White",
      description: "2020 Chicago All Star Jordan 5 Special Release !!",
      price: 1100,
      inventoryquantity: 2,
    },
  ],
  imagesOfItems: [
    {
      itemId: 1,
      url: "Game worn jersey from 1928-1930 !!!",
      description: "Babe Ruth ate so many hot dogs in this bad boy!",
      alttext: "Babe Ruth = Hot Dogs",
    },
    {
      itemId: 2,
      url: "2020 Chicago All Star Jordan 5 Special Release !!",
      description: "1 of 1 ! !",
      alttext: "Never worn!",
    },
  ],
  categories: [
    {
      id: 1,
      name: "Sports",
      description: "Rare sports memorabilia!",
    },
    {
      id: 1,
      name: "Shoes",
      description: "Exclusive Shoes",
    },
  ],
};
