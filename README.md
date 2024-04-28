# City of Kingston Housing Match

This project aims to streamline the housing search process in the City of Kingston. It connects students with landlords through an interactive platform, creating an intuitive house hunting experience.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- MySQL
- Node.js (v12.x or above)
- npm

### Frontend Setup

**Google Maps API Key**

Find the `<script>` tag in `/public/index.html` and replace `YOUR_API_KEY_HERE` with your actual Google Maps API key.

### Backend Setup

Our backend acts as the core for property data management and serves endpoints for accessing property details and images.

#### Dependencies

The project relies on several key dependencies:
- **Express**: for server setup
- **Cors**: for cross-origin resource sharing
- **MySQL2**: for MySQL interaction

Install all dependencies by navigating to the `/server` directory and running:

```Bash
npm install
npm install express cors mysql2
```

#### Database Configuration
Create your database with the provided `db.sql` script. Update `/server/database.sql` with your MySQL credentials:

```JavaScript
const db = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'yourDatabaseName'
});
```

### Running the Server
Start the server using:

```Bash
node app.js
```

The server will listen for requests, making the application accessible through http://localhost:3000.

### API Documentation

#### Endpoints
```GET /api/properties```: Fetches all property listings.

```GET /api/pictures/{pid}```: Retrieves all pictures for a property identified by PID.
