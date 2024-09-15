# 🌐 URL Shortening Web Application

## Overview

This is a URL shortening web application built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js). The app focuses on user authentication, URL shortening, and analytics. Users can create shortened URLs, track the number of clicks, and analyze usage statistics on their links. The application includes robust authentication features such as user registration, login, password management, and account activation.

## ✨ Features

- **URL Shortening**: Easily shorten long URLs for sharing.
- **Redirection**: Redirect users from the shortened URL to the original URL.
- **User Authentication**: Register, log in, and manage user accounts securely.
- **Password Management**: Reset forgotten passwords and activate user accounts.
- **Analytics**: Track and view statistics of clicked URLs.
- **Authorization**: Protect specific routes with token-based authentication (JWT).

## 🛠️ Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/srija1202/urlshortener-backend.git
cd urlshortener-backend
```

### Environment Variables

Create a `.env` file in the root of the project and add the following variables:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=5000
```

Replace `<username>`, `<password>`, and `<dbname>` with your MongoDB credentials and database name.

### Install Dependencies

```bash
npm install
```

### Start the Server

```bash
npm start
```

The server will run on `https://urlshortener-backend-lja7.onrender.com`.

## 📋 API Endpoints

### 🔐 Authentication Routes

- **POST /api/auth/register** - Register a new user.
- **POST /api/auth/login** - Log in and obtain a JWT token.
- **POST /api/auth/forget-password** - Request a password reset.
- **POST /api/auth/reset-password/:token** - Reset password using a token.
- **GET /api/auth/activate/:token** - Activate a user account using a token.

### 🔗 URL Routes

- **POST /api/url/shorten** - Shorten a new URL (requires authentication).
- **GET /api/url/clicked-urls** - Get URLs clicked by the user (requires authentication).
- **GET /api/url/:shortUrl** - Redirect to the original URL from the shortened URL.
  Postman Doc - https://documenter.getpostman.com/view/21169925/2sAXqp83XU
