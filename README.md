# CISC499_housing_P
CISC 499 capstone project: City of Kingston Housing Match (Prof. Wendy Powley)

## Backend Setup
This current backend serves as the data management and API layer for providing endpoints to access property details and associated images.

### Dependencies
- Node.js (version 12.x or above)
- npm for managing packages
  
### Installing the npm packages
1. Navigate to the backend directory.
2. >sudo npm install
3. >npm install express cors mysql2

If not yet created, create the database on your local machine using the provided db.sql script.

In server/database.sql, edit the configuration fields according to your database setup:

  host: 'localhost',
  user: 'root', // Change this to the username you set when creating the db on your machine
  password: 'housingmatch', // Change this to the password you set when creating the db on your machine
  database: 'cisc_499', 

Start the node server:
>node app.js

## API Documentation

### Endpoints

- **GET /api/properties**: Fetches all property listings.
- **GET /api/pictures/{pid}**: Fetches all pictures for a property with the given PID.
