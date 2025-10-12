# Ecommerce Backend API

A robust Node.js/Express API for the ecommerce website with MongoDB integration, JWT authentication, and cart persistence.

## Features

- 🔐 **Authentication & Authorization**: JWT-based auth with role-based access control
- 🛒 **Cart Management**: Persistent cart storage with automatic sync
- 👤 **User Management**: Profile updates, password changes
- 📦 **Product Management**: CRUD operations with search and filtering
- 🔒 **Security**: Rate limiting, input validation, password hashing
- 📱 **CORS Enabled**: Ready for frontend integration

## Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   The `.env` file is already configured with your MongoDB connection string.

4. **Seed the database** (optional):
   ```bash
   node seedProducts.js
   ```

5. **Start the server**:
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### User Management
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/change-password` - Change password

### Cart Management
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/:productId` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart
- `POST /api/cart/sync` - Sync frontend cart with backend

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `GET /api/products/categories/list` - Get all categories

## Database Models

### User
- Personal information (name, email, phone)
- Address details
- Password (hashed)
- Role (user/admin)
- Account status

### Cart
- User association
- Items array with product details
- Automatic total calculations
- Last updated timestamp

### Product
- Product details and pricing
- Stock management
- Categories and ratings
- Featured/trending flags

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Helmet.js security headers

## Environment Variables

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

## Usage with Frontend

The API is configured to work with your React frontend. Make sure to:

1. Update the API base URL in your frontend
2. Include JWT token in Authorization header
3. Handle authentication state properly
4. Sync cart data on login/logout

## Testing

You can test the API using tools like Postman or curl:

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Password123"}'
```

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Update CORS origins to include your production domain
3. Use a secure JWT secret
4. Enable MongoDB Atlas IP whitelist
5. Use a process manager like PM2

## Support

For issues or questions, check the error logs and ensure:
- MongoDB connection is active
- Environment variables are set correctly
- Frontend is making requests to correct endpoints
- JWT tokens are included in authenticated requests