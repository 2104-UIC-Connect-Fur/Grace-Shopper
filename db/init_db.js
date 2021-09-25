// code to build and initialize DB goes here
const {
  client,
  createUser,
  createUserPayment,
  createUserAddress,
  createOrder,
  addItemToOrder,
  createItems,
  createItemImages,
  createCategories,
  // other db methods
} = require('./index');
const {
  users: usersToCreate,
  userpayments: userPaymentsToCreate,
  useraddresses: userAddressesToCreate,
  orders: ordersToCreate,
  ordersitems: ordersItemsToCreate,
  items: itemsToCreate,
  imagesOfItems: imagesToDisplay,
  categories: createdCategories,
} = require('./fakeData');

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
  DROP TABLE IF EXISTS itemsimages;
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
      ccnumber VARCHAR(255) UNIQUE NOT NULL,
      ccsecuritycode INTEGER NOT NULL,
      ccexpiration VARCHAR(255) NOT NULL,
      zipcode VARCHAR(255) NOT NULL
    );

    CREATE TABLE usersaddresses(
      id SERIAL PRIMARY KEY,
      "userId" INTEGER REFERENCES users(id),
      street VARCHAR(255) NOT NULL,
      apartment VARCHAR(255),
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

    CREATE TABLE itemsimages(
      id SERIAL PRIMARY KEY,
      "itemId" INTEGER REFERENCES items(id),
      url TEXT NOT NULL,
      description TEXT NOT NULL,
      alttext VARCHAR(255)
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
        nameoncard VARCHAR(255) NOT NULL,
        billingaddress VARCHAR(255) NOT NULL,
        ccnumber INTEGER NOT NULL,
        ccsecuritycode INTEGER NOT NULL,
        ccexpiration VARCHAR(255) NOT NULL,
        cczipcode VARCHAR(255) NOT NULL,
        "discountId" INTEGER REFERENCES discounts(id)
      );

      CREATE TABLE ordersitems(
        id SERIAL PRIMARY KEY,
        "orderId" INTEGER REFERENCES orders(id),   
        "itemId" INTEGER REFERENCES items(id),
        quantity INTEGER NOT NULL,
        priceatpurchase INTEGER
      );

      CREATE TABLE reviews(
        id SERIAL PRIMARY KEY,
        "itemId" INTEGER REFERENCES items(id),
        "userId" INTEGER REFERENCES users(id),
        title VARCHAR(255) NOT NULL,
        bodytext TEXT NOT NULL
      );
      `);

    console.log('completed creating tables...');
    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function createInitialUsers() {
  console.log('Starting to create users...');
  try {
    const users = await Promise.all(usersToCreate.map(createUser));
    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialUserPayments() {
  console.log('Starting to create user payments...');
  try {
    const userPayments = await Promise.all(
      userPaymentsToCreate.map(createUserPayment),
    );
    console.log('Users payments created:');
    console.log(userPayments);
    console.log('Finished creating user payments!');
  } catch (error) {
    console.error('Error creating user payments!');
    throw error;
  }
}

async function createInitialUserAddresses() {
  console.log('Starting to create user addresses...');
  try {
    const userAddresses = await Promise.all(
      userAddressesToCreate.map(createUserAddress),
    );
    console.log('Users addresses created:');
    console.log(userAddresses);
    console.log('Finished creating user addresses!');
  } catch (error) {
    console.error('Error creating user addresses!');
    throw error;
  }
}

async function createInitialOrders() {
  console.log('Starting to create orders...');
  try {
    const orders = await Promise.all(ordersToCreate.map(createOrder));
    console.log('Orders created:');
    console.log(orders);
    console.log('Finished creating orders');
  } catch (error) {
    console.error('Error creating orders');
    throw (error);
  }
}

async function createInitialOrdersItems() {
  console.log('Starting to create ordersitems...');
  try {
    const ordersitems = await Promise.all(ordersItemsToCreate.map(addItemToOrder));
    console.log('Added items to orders:');
    console.log(ordersitems);
    console.log('Finished adding items to orders');
  } catch (error) {
    console.error('Error creating adding item to order');
    throw (error);
  }
}

async function createInitialItems() {
  console.log('Starting to create user items...');
  try {
    const items = await Promise.all(itemsToCreate.map(createItems));
    console.log('Items created:');
    console.log(items);
    console.log('Finished creating items!');
  } catch (error) {
    console.error('Error creating items');
    throw error;
  }
}

async function createInitialImages() {
  console.log('Starting to create images...');
  try {
    const items = await Promise.all(imagesToDisplay.map(createItemImages));
    console.log('Images created:');
    console.log(items);
    console.log('Finished creating Images!');
  } catch (error) {
    console.error('Error creating Images');
    throw error;
  }
}

async function createInitialCategories() {
  console.log('Starting to create user Categories...');
  try {
    const categories = await Promise.all(
      createdCategories.map(createCategories),
    );
    console.log('Categories created:');
    console.log(categories);
    console.log('Finished creating categories!');
  } catch (error) {
    console.error('Error creating categories');
    throw error;
  }
}
async function populateInitialData() {
  try {
    // create useful starting data
    console.log('populating data...');
    await createInitialUsers();
    await createInitialUserPayments();
    await createInitialUserAddresses();
    await createInitialItems();
    await createInitialOrders();
    await createInitialOrdersItems();
    await createInitialImages();
    await createInitialCategories();
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
