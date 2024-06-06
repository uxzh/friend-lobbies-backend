# 🚀 FriendZone Backend - Connecting Like-minded People

## 📖 Overview

This repository contains the backend code for FriendZone, a web application designed to help people connect with others who share similar interests. 
The backend is built using Node.js and Express, providing a robust and scalable foundation for handling user authentication, data storage, and API endpoints. 🔒📊
You can access the frontend here [friend-lobbies-frontend](https://github.com/uxzh/friend-lobbies-frontend).

## 🌟 Features

- **User Authentication**: The backend handles user registration and login, ensuring secure access to the application. 🔐👤
- **API Endpoints**: RESTful API endpoints are implemented to handle various functionalities, such as user profile management, friend matching, messaging, and event creation. 🌐📡
- **Database Integration**: The backend integrates with MongoDB using Mongoose to store and retrieve user data, friend connections, messages, and events. 🍃🗄️
- **Real-time Communication**: Socket.IO is used to enable real-time communication between users, facilitating instant messaging and event updates. ⚡💬
- **Security and Validation**: The backend incorporates security measures such as password hashing, input validation, and authentication middleware to protect user data and prevent unauthorized access. 🛡️✅

## 🛠️ Technologies Used

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js allows for server-side JavaScript execution. 🟢🖥️
- **Express**: A minimal and flexible Node.js web application framework. Express provides a robust set of features for building web applications and APIs. 🚀🌐
- **MongoDB**: A cross-platform document-oriented database program. MongoDB stores data in flexible, JSON-like documents, making it suitable for handling unstructured data. 🍃📊
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js. Mongoose provides a schema-based solution for modeling application data and simplifies interactions with the database. 🦾🗄️
- **Socket.IO**: A library that enables real-time, bidirectional, and event-based communication between the browser and the server. Socket.IO is used for instant messaging and event updates. ⚡🔌
- **JSON Web Tokens (JWT)**: A compact and self-contained way of securely transmitting information between parties as a JSON object. JWTs are used for user authentication and authorization. 🔒🔑
- **Bcrypt**: A library for hashing passwords. Bcrypt is used to securely store user passwords in the database. 🔐🔍

## 🚀 Getting Started

To run the FriendZone backend locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/uxzh/friend-lobbies-backend.git
   ```

2. Navigate to the project directory:
   ```
   cd friend-lobbies-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Define the required environment variables (e.g., database connection URL, JWT secret).

5. Start the development server:
   ```
   npm start
   ```

6. The backend server should now be running on `http://localhost:5000`.

## 🤝 Contributing

We welcome contributions from the community! If you'd like to contribute to the FriendZone backend, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository, explaining your changes and their benefits.

We appreciate your help in making FriendZone better! 😊

## 📧 Contact

If you have any questions, suggestions, or feedback regarding the FriendZone backend, please feel free to reach out at uxzh@pm.me.

We'd love to hear from you! 💬

Happy coding and connecting with FriendZone! 👥💻
