URL Shortening Web Application
Overview
This is a URL shortening web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) with a focus on authentication, URL shortening, and analytics. Users can shorten URLs, track clicked URLs, and access analytics on their shortened links. The application features user authentication with login, registration, password reset, and account activation functionalities.

Features
URL Shortening: Shorten long URLs and share them with ease.
Redirection: Redirect users from shortened URLs to the original long URLs.
User Authentication: Register, log in, and manage user accounts.
Password Management: Reset forgotten passwords and activate user accounts.
Analytics: Track and view statistics on clicked URLs.
Authorization: Protect certain routes with token-based authentication.
Installation and Setup
Prerequisites
Node.js (v14 or higher)
MongoDB
Git
Cloning the Repository
bash
Copy code
git clone https://github.com/srija1202/urlshortener-backend.git
cd urlshortener-backend
Environment Variables
Create a .env file in the root of the project and add the following environment variables:

php
Copy code
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=5000
Replace <username>, <password>, and <dbname> with your MongoDB credentials and database name.

Install Dependencies
bash
Copy code
npm install
Start the Server
bash
Copy code
npm start
The server will run on http://localhost:5000.

API Endpoints
Authentication Routes
POST /api/auth/register - Register a new user.
POST /api/auth/login - Log in and obtain a JWT token.
POST /api/auth/forget-password - Request password reset.
POST /api/auth/reset-password/:token - Reset password using the token.
GET /api/auth/activate/:token - Activate user account using the token.
URL Routes
POST /api/url/shorten - Shorten a new URL. Requires authentication.
GET /api/url/clicked-urls - Get URLs clicked by the user. Requires authentication.
GET /api/url/:shortUrl - Redirect to the original URL from the shortened URL.