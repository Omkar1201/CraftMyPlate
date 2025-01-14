# CraftMyPlate Application

## Overview
**CraftMyPlate** is a web application designed to provide users with an interactive and engaging platform. It features a seamless frontend and a robust backend, ensuring a smooth and efficient user experience.

---

## Frontend

The frontend of the application is built using **React.js**, delivering a responsive and intuitive interface for users.

### Environment Variables

The frontend requires the following environment variable to be set in a `.env` file:

```
REACT_APP_BASE_URL=http://localhost:5000/api/v1
```

### Running the Frontend
1. **Navigate to the frontend directory.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm start
   ```
4. The application will run on `http://localhost:3000` by default.

---

## Backend

The backend is built using **Node.js** and **Express.js**, ensuring robust and scalable API support. **MongoDB** is used as the database for storing application data.

### Environment Variables

The backend requires the following environment variables to be set in a `.env` file:

```
PORT=5000
DB_URL=mongodb://localhost:27017/DBCraftMyPlate
JWT_SECRET=<Your_JWT_Secret> Ex.-demo123
BASE_URL=http://localhost:3000
NODE_ENV=development
```

### Running the Backend
1. **Navigate to the backend directory.**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the server:**
   ```bash
   node index.js
   ```
   or for development mode:
   ```bash
   npm run dev
   ```
4. The backend will run on `http://localhost:5000` by default.

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   ```
2. **Set up the environment variables for both frontend and backend.**
3. **Start the backend and ensure it connects to MongoDB.**
4. **Start the frontend and ensure it communicates with the backend API.**

---

## Features

- **Interactive user interface** powered by **React.js**.
- **Robust API support** using **Express.js**.
- **Secure authentication** with **JWT**.
- **Seamless integration** with **MongoDB** for data persistence.

---

## Contributions

Feel free to **fork this repository** and submit pull requests for improvements or bug fixes. We welcome contributions from the community!

