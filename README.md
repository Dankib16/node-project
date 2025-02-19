# Business Cards API

## 📌 Project Description

This is a **RESTful API** for managing business cards. Users can **register**, **login**, **create**, **edit**, **delete**, and **like business cards**.  
The API supports **JWT-based authentication**, differentiating between **regular users**, **business users**, and **administrators**.

---

## 🚀 Installation and Setup

### Clone the Repository and Navigate to the Project Directory

To start, you need to download this project from GitHub:

```sh
cd node-project

---
Install Required Dependencies
npm install
---
Configure MongoDB
brew services start mongodb-community
---
Create a .env File for Environment Variables
---
Start the Server
npm run dev


📝 API Documentation
🔐 User Authentication
Register a New User
URL: POST /api/users
Headers: Not required
Request Body Example:


{
  "name": { "first": "John", "last": "Doe" },
  "isBusiness": true,
  "phone": "050-1234567",
  "email": "john.doe@example.com",
  "password": "Aa!123456",
  "address": {
    "country": "USA",
    "city": "New York",
    "street": "Broadway",
    "houseNumber": "10"
  },
  "image": { "url": "", "alt": "avatar" }
}
Response: Returns the registered user.
Login and Get a Token
URL: POST /api/users/login
Headers: Not required
Request Body Example:

{
  "email": "john.doe@example.com",
  "password": "Aa!123456"
}
Response:

{
  "token": "jwt-token"
}
🔹 The returned JWT token must be included in the x-auth-token header for authenticated requests.

📋 Business Card Management
Get All Cards
URL: GET /api/cards
Headers: Not required
Get My Business Cards
URL: GET /api/cards/my-cards
Headers:

"x-auth-token": "jwt-token"
Create a New Business Card
URL: POST /api/cards
Headers:

"x-auth-token": "jwt-token"
Request Body Example:

{
  "title": "New Card",
  "subtitle": "Card Description",
  "description": "Detailed description",
  "phone": "050-1234567",
  "email": "test@example.com",
  "web": "https://example.com",
  "image": {
    "url": "https://example.com/image.jpg",
    "alt": "Image description"
  },
  "address": {
    "country": "USA",
    "city": "New York",
    "street": "Broadway",
    "houseNumber": 10
  }
}
Edit a Business Card
URL: PUT /api/cards/:id
Headers:

"x-auth-token": "jwt-token"
Request Body Example:

{
  "title": "Updated Title",
  "subtitle": "Updated Subtitle",
  "description": "New Description"
}
Like a Business Card
URL: PATCH /api/cards/:id
Headers:

"x-auth-token": "jwt-token"
Delete a Business Card
URL: DELETE /api/cards/:id
Headers:

"x-auth-token": "jwt-token"
🛠 Project Structure

📦 NodeJS-project__business-cards-app-main
 ┣ 📂 auth
 ┣ 📂 cards
 ┣ 📂 cors
 ┣ 📂 db
 ┣ 📂 initialData
 ┣ 📂 logger
 ┣ 📂 models
 ┣ 📂 router
 ┣ 📂 users
 ┣ 📜 server.js
 ┣ 📜 .env
 ┣ 📜 .gitignore
 ┣ 📜 README.md
🛠 Additional Information
Running API Tests
You can use Postman or cURL to test API requests.

Example cURL command for login:

curl -X POST http://localhost:8181/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john.doe@example.com", "password": "Aa!123456"}'
Example cURL command to get all cards:

curl -X GET http://localhost:8181/api/cards
Possible Errors and Fixes
Error Message	Solution
Configuration property "DB_URI" is not defined	Make sure .env file exists and is correctly configured.
Access denied. Please Login.	Ensure you are sending the correct JWT token in the x-auth-token header.
Mongoose Error: user validation failed: password	Check that the password matches the required format and that all required fields are provided.
Page not found	Ensure the request URL is correct. API endpoints should start with /api/.
✍ Author
Created by Daniel Kibish.
```
