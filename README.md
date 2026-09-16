# 🛒 MultiVendor Marketplace

A full-stack **multi-vendor e-commerce marketplace** built with the **MERN stack**. The platform supports customers, sellers, and administrators with product management, shopping, orders, payments, seller dashboards, and real-time customer-seller messaging.

### 🔗 Live Demo

**Frontend:**
https://multi-vendor-red-eight.vercel.app/

### 📦 Repository

https://github.com/ImMuhammadNaveed/multi-vendor

### 💼 Project Showcase

https://www.linkedin.com/feed/update/urn:li:activity:750563105754

---

## ✨ Features

### 👤 Customer

* User registration and login
* JWT-based authentication with HTTP-only cookies
* Email-based account activation
* Browse products and categories
* Search and filter products
* Product details and reviews
* Shopping cart
* Wishlist
* Product stock validation
* Coupon support
* Checkout and order placement
* Stripe payment integration
* Order history
* Order status tracking
* Profile management
* Real-time messaging with sellers
* Image sharing through chat
* Online user status
* Responsive customer interface

### 🏪 Seller

* Seller/shop registration
* Email-based shop activation
* Seller authentication
* Seller dashboard
* Shop profile management
* Product creation
* Product editing and deletion
* Product image uploads
* Cloudinary-based image storage
* Inventory management
* Order management
* Order status updates
* Sales and shop statistics
* Coupon creation and management
* Promotional event management
* Customer-seller real-time messaging
* Seller balance management
* Withdrawal request management

### 🛠️ Admin

* Admin authentication
* Admin dashboard
* User management
* Seller/shop management
* Product management
* Order monitoring
* Platform-level statistics
* Seller withdrawal request management

---

## 💬 Real-Time Messaging

The platform includes a dedicated real-time communication system using **Socket.IO**.

Customers and sellers can:

* Start conversations
* Send real-time messages
* Receive messages without refreshing
* Share images through chat
* View online users
* Track unread conversations
* Receive real-time message updates

The Socket.IO server is maintained separately from the main Express API under the `socket/` directory.

---

## 💳 Payment Integration

The application integrates **Stripe** for online payments.

The payment flow supports:

* Secure checkout
* Stripe payment processing
* Payment status handling
* Order creation after successful payment
* Payment information associated with orders

---

## ☁️ Cloudinary Image Storage

Product, shop, and messaging images are handled using **Cloudinary** instead of relying on persistent local server storage.

This is particularly useful for deployment environments where local filesystem storage should not be treated as permanent storage.

---

## 🔐 Authentication & Security

The application implements several security mechanisms:

* JWT authentication
* HTTP-only cookies
* Password hashing with bcrypt
* Protected API routes
* Role-based authorization
* Authentication middleware
* Seller/admin access protection
* Backend-side validation
* CORS configuration
* Environment variables for sensitive credentials

---

## 🧠 State Management

The frontend uses **Redux Toolkit** for centralized application state management.

Major application states include:

* User authentication
* User profile
* Products
* Shops
* Cart
* Wishlist
* Orders
* Conversations
* Online users
* Seller/admin data
* Loading states

Redux async operations are handled through Redux Toolkit patterns and thunks.

---

## 🛠️ Tech Stack

### Frontend

* **React 19**
* **Vite**
* **React Router 7**
* **Redux Toolkit**
* **React Redux**
* **Tailwind CSS 4**
* **Material UI Data Grid**
* **Axios**
* **Framer Motion**
* **React Icons**
* **React Toastify**
* **Stripe.js**
* **Socket.IO Client**

### Backend

* **Node.js**
* **Express.js 5**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcrypt**
* **Cookie Parser**
* **CORS**
* **Multer**
* **Cloudinary**
* **Nodemailer**
* **Stripe**

### Real-Time Communication

* **Socket.IO**
* **Socket.IO Client**

### Development & Deployment

* **Git & GitHub**
* **Vite**
* **Nodemon**
* **Vercel**
* **Cloudinary**
* **MongoDB Atlas**

---

## 🏗️ Architecture

The project is divided into three main applications:

```text
multi-vendor/
│
├── frontend/          # React + Vite frontend
│
├── backend/           # Express REST API + MongoDB
│
├── socket/            # Dedicated Socket.IO server
│
└── README.md
```

### High-Level Architecture

```text
                    ┌──────────────────────┐
                    │      Customers       │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │      Frontend        │
                    │ React + Vite         │
                    │ Redux Toolkit        │
                    │ Tailwind CSS         │
                    └───────┬───────┬──────┘
                            │       │
                    REST API│       │Socket.IO
                            │       │
                 ┌──────────▼───┐ ┌─▼─────────────┐
                 │   Backend    │ │ Socket Server │
                 │ Express.js   │ │  Socket.IO    │
                 └──────┬───────┘ └──────┬───────┘
                        │                 │
             ┌──────────┼─────────┐       │
             │          │         │       │
       ┌─────▼────┐ ┌──▼─────┐ ┌─▼─────┐ │
       │ MongoDB  │ │ Stripe │ │Cloudinary│
       │          │ │        │ │         │
       └──────────┘ └────────┘ └─────────┘
```

---

## 📂 Project Structure

```text
multi-vendor/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   ├── thunks/
│   │   │   └── store/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── socket/
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## 🧩 Main Backend Modules

The backend is organized around separate business domains:

```text
Authentication
      │
      ├── Users
      ├── Shops / Sellers
      └── Admin
      │
      ├── Products
      ├── Events
      ├── Coupons
      ├── Orders
      ├── Payments
      ├── Withdrawals
      ├── Conversations
      └── Messages
```

The application uses REST APIs for standard business operations and Socket.IO for real-time communication.

---

## 🗄️ Database

The application uses **MongoDB with Mongoose**.

Core data models include:

* Users
* Shops
* Products
* Orders
* Events
* Coupons
* Conversations
* Messages
* Withdrawal Requests

MongoDB Atlas can be used as the hosted database for the application.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ImMuhammadNaveed/multi-vendor.git

cd multi-vendor
```

### 2. Install Backend Dependencies

```bash
cd backend

npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend

npm install
```

### 4. Install Socket Server Dependencies

```bash
cd ../socket

npm install
```

---

## 🔑 Environment Variables

The exact environment variable names should match the configuration used in each application.

### Backend

Create:

```text
backend/.env
```

Typical configuration includes:

```env
PORT=5000

DATABASE_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_API_KEY=your_stripe_secret_key

SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_email
SMTP_PASSWORD=your_email_password
```

> Do not commit `.env` files or API credentials to GitHub.

### Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://localhost:5000
```

Use the environment variable names configured in the frontend API and Socket.IO services if they differ from the example above.

### Socket Server

Create:

```text
socket/.env
```

Configure the Socket.IO server according to the deployment environment and frontend origin.

---

## ▶️ Running Locally

You need three processes running during development.

### Terminal 1 — Backend

```bash
cd backend

npm run dev
```

### Terminal 2 — Frontend

```bash
cd frontend

npm run dev
```

### Terminal 3 — Socket.IO Server

```bash
cd socket

npm run dev
```

Then open the Vite development URL shown in the terminal, normally:

```text
http://localhost:5173
```

---

## 🚀 Production Deployment

The project is structured so the frontend, backend, and real-time server can be deployed independently.

### Frontend

The React frontend can be deployed to:

* Vercel
* Netlify
* Other static hosting platforms

### Backend

The Express backend can be deployed to a Node.js-compatible hosting platform.

### Socket.IO

The Socket.IO server should run on a hosting platform that supports persistent WebSocket connections.

### External Services

The application uses:

* **MongoDB Atlas** for database hosting
* **Cloudinary** for image storage
* **Stripe** for payment processing
* **SMTP/Nodemailer** for email services

---

## 📱 Responsive Interface

The frontend is built with responsive layouts so the marketplace can be accessed across:

* Desktop
* Laptop
* Tablet
* Mobile

Tailwind CSS is used for responsive styling and layout management.

---

## 🔄 Application Flow

### Customer Flow

```text
Register
   ↓
Email Activation
   ↓
Login
   ↓
Browse Products
   ↓
Search / Filter
   ↓
Product Details
   ↓
Cart / Wishlist
   ↓
Checkout
   ↓
Stripe Payment
   ↓
Order Created
   ↓
Track Order
```

### Seller Flow

```text
Register Shop
   ↓
Email Activation
   ↓
Seller Login
   ↓
Seller Dashboard
   ↓
Create Products
   ↓
Manage Inventory
   ↓
Receive Orders
   ↓
Process Orders
   ↓
View Sales
   ↓
Manage Coupons / Events
```

### Messaging Flow

```text
Customer
    │
    │ Socket.IO
    ▼
Socket Server
    │
    ▼
Seller
    │
    │ Real-time response
    └────────────────────► Customer
```

---

## 🧱 Key Engineering Concepts

This project demonstrates practical implementation of:

* MERN stack development
* REST API architecture
* MVC-style backend organization
* JWT authentication
* HTTP-only cookie authentication
* Role-based authorization
* MongoDB data modeling
* Mongoose relationships
* Redux Toolkit state management
* Async Redux operations
* Real-time communication with Socket.IO
* Cloud-based image storage
* Stripe payment integration
* Email-based account activation
* File uploads
* Protected routes
* CORS configuration
* Responsive UI development
* Environment-based configuration
* Production deployment

---

## 📸 Screenshots

Screenshots and application demonstrations can be added here.

### Customer Interface

*Add screenshots of the customer marketplace, product pages, cart, checkout, orders, and messaging.*

### Seller Dashboard

*Add screenshots of the seller dashboard, products, orders, coupons, events, and shop management.*

### Admin Dashboard

*Add screenshots of admin management and platform statistics.*

---

## 👨‍💻 Author

### Muhammad Naveed

Computer Science Undergraduate
MERN Stack Developer

* GitHub: https://github.com/ImMuhammadNaveed
* LinkedIn: https://www.linkedin.com/in/immuhammadnaveed/

---

## 📄 License

This project was developed for **educational and portfolio purposes**.

---

## ⭐ Project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

**Live Demo:**
https://multi-vendor-red-eight.vercel.app/

**GitHub:**
https://github.com/ImMuhammadNaveed/multi-vendor
