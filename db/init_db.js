// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require('./index');

async function buildTables() {
  try {
    client.connect();
    console.log('dropping tables...');
    // drop tables in correct order
    await client.query(`
  DROP TABLE IF EXISTS itemscategories;
  DROP TABLE IF EXISTS usersaddresses;
  DROP TABLE IF EXISTS userspayments;
  DROP TABLE IF EXISTS ordersitems;
  DROP TABLE IF EXISTS categories;
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS discounts;
  DROP TABLE IF EXISTS items;
  DROP TABLE IF EXISTS users;
  `);

    console.log('completed dropping tables...');

    console.log('building tables...');
    await client.query(`
    CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      phonenumber VARCHAR(255) NOT NULL,
      zipcode VARCHAR(255) NOT NULL,
      isAdmin BOOLEAN DEFAULT false
    );

    CREATE TABLE userspayments(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      cardname VARCHAR(255) NOT NULL,
      nameoncard VARCHAR(255) NOT NULL,
      billingaddress VARCHAR(255) NOT NULL,
      ccnumber INTEGER NOT NULL,
      ccsecuritycode INTEGER NOT NULL,
      ccexpiration VARCHAR(255) NOT NULL,
      zipcode VARCHAR(255) NOT NULL
    );

    CREATE TABLE usersaddresses(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      street VARCHAR(255) NOT NULL,
      apartment VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      zipcode VARCHAR(255) NOT NULL
    );

    CREATE TABLE items(
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price INTEGER NOT NULL,
      inventoryquantity INTEGER NOT NULL
    );

    CREATE TABLE categories(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE itemscategories(
      id SERIAL PRIMARY KEY,
      "itemId" INTEGER REFERENCES items(id),
      "categoryId" INTEGER REFERENCES categories(id)
    );

    CREATE TABLE discounts(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      amount INTEGER NOT NULL
      );
      
      CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id),
        total INTEGER NOT NULL,
        complete BOOLEAN DEFAULT false,
        street VARCHAR(255) NOT NULL,
        apartment VARCHAR(255),
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        zipcode VARCHAR(255) NOT NULL,
        "discountId" INTEGER REFERENCES discounts(id)
      );

      CREATE TABLE ordersitems(
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),   
        "itemId" INTEGER REFERENCES items(id),
        quantity INTEGER NOT NULL,
        priceatpurchase INTEGER,
        nameoncard VARCHAR(255) NOT NULL,
        billingaddress VARCHAR(255) NOT NULL,
        ccnumber INTEGER NOT NULL,
        ccsecuritycode INTEGER NOT NULL,
        ccexpiration VARCHAR(255) NOT NULL,
        zipcode VARCHAR(255) NOT NULL
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "itemId" INTEGER REFERENCES items(id),
        "userId" INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        bodytext TEXT NOT NULL
      );
      `);

    console.log('completed dropping tables...');
    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
    console.log('populating data...');
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
