# 📚 PageHaven API

**PageHaven** is a book e-commerce RESTful API built with **Node.js**, **Express**, and **MongoDB**. It supports book management, user authentication, cart handling, and order processing.

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (Bearer Token)
- **API Documentation**: OpenAPI 3.0 (`docs/openapi.yaml`)
- **Validation & Middleware**: Custom middleware for authentication, error handling, and request validation
- **File Uploads**: `multer` for handling book cover images

---

## 📁 Project Structure

```
├── controllers/         # Logic for each endpoint
├── docs/                # OpenAPI (Swagger) documentation
├── dtos/                # Data Transfer Object schemas
├── middleware/          # Auth, validation, upload, and error handling
├── models/              # Mongoose schemas (Book, User, Cart, Order)
├── routes/              # Route definitions
├── .env                 # Environment variables
└── server.js            # App entry point
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/pagehaven-api.git
cd pagehaven-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up your `.env` file

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/pagehaven
JWT_SECRET=your_jwt_secret_key
```

### 4. Start the server

```bash
npm run dev  # or: node server.js
```

---

## 📘 API Endpoints

You can explore the API using [Swagger UI](https://editor.swagger.io/) with the `docs/openapi.yaml` file.

### 🔐 Authentication

- `POST /api/auth/login` – Login user
- `POST /api/auth/register` – Register user

### 📚 Books

- `GET /api/books` – List books (supports filters and pagination)
- `GET /api/books/:id` – Get book by ID
- `PUT /api/books/:id` – Update book (authenticated)
- `DELETE /api/books/:id` – Delete book (authenticated)

### 👤 Users

- `GET /api/users` – Get all users (admin only)
- `GET /api/users/:id` – Get specific user (authenticated)

### 🛒 Cart

- `GET /api/cart` – Get cart items
- `POST /api/cart` – Add item to cart
- `DELETE /api/cart/:id` – Remove item from cart

### 📦 Orders

- `GET /api/orders` – List user’s orders
- `POST /api/orders` – Create new order

---

## 🔐 Security

- JWT-based authentication for protected routes
- Role-based access control for user management

---

## 🧪 Testing

You can test your API locally with tools like:

- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- Swagger Editor (`docs/openapi.yaml`)

---

## 📦 Deployment

To deploy to platforms like **Render**, **Vercel (API)**, or **Heroku**, ensure environment variables are configured properly and MongoDB Atlas is used for remote DB connection.

---

## 📄 License

This project is licensed under the MIT License.
