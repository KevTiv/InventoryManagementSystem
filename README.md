# inventoryManagementSystem

# LIVE DEMO 
  https://kevtiv.github.io/inventoryManagementSystem/

# DESCRIPTION
The is web application project was created with the aim to produce an easy online solution for small businesses inventory management needs. 
The project has reached its MVP (minimum viable product) goal of producing a product that can store products information, brands information, and 
inventory details in a PostgreSQL database. The project was built using Typescript. The front end was built using ReactJs, Sass, and TailwindCSS. 
The back end was built with NodeJs, and PrismaJs as the ORM (Object-relational mapping) tool use to communicate with the PostgreSQL database.

# GOAL
- Create a product that can meet the inventory management needs of a small business.
- MVP: Keep track of an inventory (product quantity, product details and brand).

# CHALLENGES
- Find an ORM tool that will minimize SQL error and abstract the different queries inside the codebase. The ORM has to work with typescript preferably.
- Implement an authentication schema that is secure and reliable.
- Implement a layer of security against bots.
- Create details forms and correctly pass along the data from said forms.
- Find an effective solution for storing images.
- Change the software theme according the user computer theme.
- Create an application with technologies not used before like typescript, Firebase and PrismaJS.

# SOLUTION IMPLEMENTED
- Through my research for an ORM that works with typescript I found PrismaJS. Prisma works especially well due to it’s fairly minimal initial setup, 
  and the process of setting up the different database tables is especially easy due it’s JSON like format.
- For the login and authentication process of the software, I opted to go with a proven authentication solution such as Oauth or google auth through 
  firebase. I opted to the latter because firebase also offer an effective storage schema for image and ReCaptcha to detects bots.
- The forms implementation were especially tricky, I first tried to simply use react state hooks to manage the content of the forms and pass them along 
  to the database but it didn’t behave as expected. After researching for ways to make my forms work, I opted to use the react-hook-form library which 
  fixed my issues of inconsistent data input with my forms.
  
# FUTURE IMPROVEMENT
- Add a user profile picture from their google account used to sign in the app.
- Add option to change theme between light or dark theme.
- Add an order table to manage incoming and outgoing orders.
- Add an order interface for the end user to visualize incoming and outgoing orders.
- Add widgets for the end user to visualize stock movements, such as a graph of products past movement on a set time.
- Add widgets of products with comparison, from stored data such as difference in stocks at current data with previous years.
- Add server response message card. e.g.: Product was successfully added. 
- implement error handling for wrong form submissions and updating the state of any form error to the end user.

# KNOWN ISSUES
- When the end user input a new product, brand, inventory or update a product, brand or update inventory. He/she has to manually refresh the page for 
  the affected table to reflect the change.
- A cloud-based PostgreSQL database is not yet set online.
