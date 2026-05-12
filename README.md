# EliteCommerce - Full Stack MERN E-Commerce Platform

### Live Link: https://mern-stack-e-commerce-platform.vercel.app/

A premium, fully integrated E-Commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

### Backend
- **Authentication**: Secure JWT authentication with bcryptjs password encryption.
- **REST APIs**: Structured CRUD endpoints for Products, Orders, and User Profiles.
- **Filtering & Search**: Dynamic product querying based on keywords, categories, and sorting.
- **Recommendation System**: Simulated RapidMiner-based logic for personalized product suggestions.
- **Security**: Role-based access control (RBAC) via custom middleware.
- **Modular Architecture**: Clean routing, modular controllers, and scalable folder structure.

### Frontend
- **State Management**: Global state handling using Redux Toolkit for Cart and Auth.
- **Product Discovery**: Interactive listing with advanced search, filtering, and detailed views.
- **User Experience**: Responsive UI styled with Tailwind CSS, featuring glassmorphism and smooth animations.
- **Secure Checkout**: Seamless cart-to-order flow with authentication synchronization.
- **Protected Routes**: Restrict access to sensitive pages like Profile and Order History.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Redux Toolkit, React Router, Axios, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Bcryptjs.
- **Other**: Git/GitHub, Environment Variables.

## 📦 Project Structure

```text
ecommerce-platform/
├── ecommerce-backend/    # Express Server
│   ├── config/           # DB Connection
│   ├── controllers/      # Route logic
│   ├── middleware/       # Auth & Error handling
│   ├── models/           # Mongoose schemas
│   └── routes/           # API endpoints
└── ecommerce-frontend/   # Vite React App
    ├── src/
    │   ├── components/   # Reusable UI
    │   ├── pages/        # View components
    │   └── redux/        # Store & Slices
    └── .env              # Frontend config
```

## ⚙️ Setup Instructions

### Backend
1. `cd ecommerce-backend`
2. `npm install`
3. Create `.env` with `MONGO_URI`, `PORT`, and `JWT_SECRET`.
4. `npm run dev`

### Frontend
1. `cd ecommerce-frontend`
2. `npm install`
3. Create `.env` with `VITE_API_URL`.
4. `npm run dev`

## 📊 Analytics & Recommendations
The recommendation system in `analyticsController.js` simulates integration with RapidMiner AI Hub, providing data-driven product suggestions to enhance user engagement.

---
Developed as part of the Module 5 Assignment.
