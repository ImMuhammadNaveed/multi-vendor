# 🛒 MultiVendor Marketplace

A full-stack **Multi-Vendor E-Commerce Marketplace** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The platform enables multiple sellers to manage their own stores while customers can browse products, place orders, track orders, and communicate with sellers in real time.

---

## 🚀 Features

### 👤 Customer
- User registration and login
- Secure authentication using JWT and HTTP-only cookies
- Browse all products
- Search, filter, and sort products
- View product details
- Add/remove items from cart
- Wishlist management
- Place orders
- Track order status
- View order history
- Manage profile
- Real-time messaging with sellers
- Product reviews and ratings

### 🛍️ Seller
- Seller registration and authentication
- Seller dashboard
- Add new products
- Edit and delete products
- Manage inventory
- View and manage customer orders
- Update order status
- View sales information
- Real-time chat with customers

### 🛠️ Admin
- Admin dashboard
- Manage users
- Manage sellers
- Manage products
- Monitor orders
- Manage categories
- Platform statistics

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Cookie Parser
- Bcrypt
- Socket.IO

### Other Tools
- Multer (File Uploads)
- Nodemailer (Email Services)

---

## 🔒 Security Features

- JWT Authentication
- HTTP-only Cookies
- Password Hashing (bcrypt)
- Protected Routes
- Backend Authentication Middleware
- Input Validation

---

## 📦 Main Modules

- Authentication
- Product Management
- Category Management
- Shopping Cart
- Wishlist
- Order Management
- Seller Dashboard
- Admin Dashboard
- User Profile
- Real-Time Messaging System
- Product Reviews

---

## 📂 Project Structure

```
project/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
```

### Navigate to the project

```bash
cd your-repository
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ▶️ Running the Project

### Backend

```bash
cd backend
npm run dev
```

### Frontend

```bash
cd frontend
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL=your_email
EMAIL_PASSWORD=your_email_password
```

Create another `.env` file inside the frontend folder.

Example:

```env
VITE_BACKEND_URL=http://localhost:5000
```

---

## 📸 Screenshots
<img width="960" height="540" alt="Screenshot 2026-06-28 224250" src="https://github.com/user-attachments/assets/f714ea0a-9645-4868-90a4-fa82e7a271e3" />
<img width="960" height="540" alt="Screenshot 2026-06-28 224329" src="https://github.com/user-attachments/assets/38e96d27-85f0-4b05-bb1e-0d33d38dd156" />
<img width="959" height="540" alt="Screenshot 2026-06-28 224404" src="https://github.com/user-attachments/assets/3db5c718-27d4-40dd-ae74-66d898a04116" />
<img width="960" height="540" alt="Screenshot 2026-06-28 224427" src="https://github.com/user-attachments/assets/40cc34fc-c0bf-47d9-be5a-111475267455" />
<img width="959" height="540" alt="Screenshot 2026-06-28 224444" src="https://github.com/user-attachments/assets/ba03a294-e645-47d2-9ea7-ba58a777b44e" />
<img width="959" height="540" alt="Screenshot 2026-06-28 224538" src="https://github.com/user-attachments/assets/8561f577-3caa-4f78-9f74-372ffa4051e5" />
<img width="960" height="540" alt="Screenshot 2026-06-28 223244" src="https://github.com/user-attachments/assets/611a2254-0ae8-4cf1-9c18-05bcc780e129" />

---

## 👨‍💻 Author

**Muhammad Naveed**

---

## 📄 License

This project is developed for educational and portfolio purposes.
