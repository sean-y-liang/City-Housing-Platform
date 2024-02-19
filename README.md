# CISC499_housing_P
CISC 499 capstone project: City of Kingston Housing Match (Prof. Wendy Powley)

## Frontend Setup

### Google Maps API
Replace the key in index.html with your Google Maps API key.

## Backend Setup
This current backend serves as the data management and API layer for providing endpoints to access property details and associated images.

### Dependencies
- MySQL
- Node.js (version 12.x or above)
- npm for managing packages
  
### Installing the npm packages
Navigate to the backend directory.
>sudo npm install

>npm install express cors mysql2

### Database setup
If not yet created, create the database on your local machine using the provided db.sql script. Remember your username (default: root) and password.

In server/database.sql, edit the 'user' and 'password' fields according to your set credentials.

## Running the Node Server
Start the node server.
>node app.js

The node application will begin listening for requests.

## API Documentation
### Endpoints
- **GET /api/properties**: Fetches all property listings.
- **GET /api/pictures/{pid}**: Fetches all pictures for a property with the given PID.
