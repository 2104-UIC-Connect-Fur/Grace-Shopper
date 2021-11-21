# Rare Stuff

#### Team members: [Miguel Arias](https://github.com/Miguel2493), [Michael Meidenbauer](https://github.com/michaelmeidenbauer), and [Lucas Wakefield](https://github.com/llwakefield)

Together, we built [Rare Stuff](http://rare-stuff.herokuapp.com), a full-stack e-commerce website and source for exclusive, often nostalgic, and occasionally off-the-wall items in categories like music, sports, and sneakers. The technical foundation of our project is an Express.js web server, a PostgreSQL database, and a React.js front end.

## So, What Does It Do?

As an online store, Rare Stuff displays items that are for sale, and it allows the user to navigate the inventory by browsing, filtering by category, price, or keyword, and by using a shuffle feature.

Once a user creates an account and logs in, they are able to add items to their cart, modify the cart, and proceed to checkout. From there, the user enters essential purchase information and completes the checkout process.

For Admin users, additional features are baked into the front end to allow the individual to add items to the store, edit item details, delete items, and view user information.


## And How Does It Do That?

#### React.js:
- Allows for the creation of a single-page app full of hooks that detect changes in state and trigger rendering of content as needed
- Makes for a smoother user experience, as it limits the reloading of content

#### Express.js:
- Lightweight and efficient as it serves up data from the back end to the front end
- Using middleware, we can attach and later check for a JSON Web Token on a server-side cookie to identity a logged-in user and to determine whether or not they have admin-level access

#### PostgreSQL:
- Database management system used to store and update information related to items, users, orders, and more

#### bcrypt:
- Improves security by hashing user passwords

#### React-Bootstrap:
- Provided us with a clean, easy-to-implement, and customizable foundation for the styling of our app

#### ESLint:
- Using the Airbnb style guide, ESLint helped to keep our code consistent, clean, and readable, which likely saved us from a number of unexpected bugs

## Lessons Learned

#### Authentication:
- To create a convenient and secure authentication process, for a successfully logged-in user, we attached a server-side cookie, which included the JWT that resulted from the confirmation of their login. Using middleware, we could then pull the JWT off a user's cookie, determine the user information, and then attach those details to the `req` object. This made it more convenient to access the current user's ID anytime it was required to return user-specific information
- Since the current user and their login status need to permeate the app, we resolved to store current username and login status in global state, with the help of useContext

#### User Cart:
- One complicated decision that we made in the beginning while designing our database was how to construct the user's cart. Our solution was to define the cart as a user's incomplete order. We then wrote a database method to pull the required information from the orders, users, items, and ordersitems tables to build the user's cart
- On the front end, since the cart needs to be dynamic, we carefully set up hooks to detect updates, such as the cart contents and the user's login status. Storing the cart in global state allowed for more convenient access to the cart throughout the app


#### Styling:
- We took advantage of React-Bootstrap's built-in components, such as popovers and alerts, to provide helpful, well-positioned feedback to the user to guide them toward the action that they are attempting to make
- Similarly, we sought to create a dynamic, engaging user experience by using modals, offcanvases, and image carousels

## Challenges and Ideas for the Future

- One issue that we still hope to solve is how best to create a guest cart and, in the event that a user would then log in or create an account, merge carts in a way that would make sense to the user
- We built some of the foundation on the back end to allow for discounts and product reviews, and we would like to complete the development on the front end to further enhance the user experience on our website
- We would like to develop a user profile section where users can update their personal information and view their order history