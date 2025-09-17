# LUXE E-commerce with MySQL Backend

Complete e-commerce platform with React frontend, admin panel, and MySQL backend.

## 🏗️ Architecture

```
LUXE Platform
├── Frontend (React + Vite) - Port 3000
├── Admin Panel (React + Vite) - Port 3001  
├── API Server (Express + MySQL) - Port 4000
└── MySQL Database
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm run setup
```

### 2. Setup MySQL Database
```bash
# Create database
mysql -u root -p
CREATE DATABASE luxe_ecommerce;
```

### 3. Configure Environment
Create `server/.env`:
```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=luxe_ecommerce
JWT_SECRET=your-super-secret-jwt-key
API_PORT=4000
```

### 4. Start All Services
```bash
# Start everything at once
npm run dev:all

# Or start individually:
npm run dev:api    # API server (port 4000)
npm run dev        # Storefront (port 3000)
npm run dev:admin  # Admin panel (port 3001)
```

## 🔑 Default Login
- **Admin Panel**: http://localhost:3001
- **Email**: admin@luxe.com
- **Password**: admin123

## 📊 Database Schema

### Products Table
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `name` (VARCHAR(255))
- `description` (TEXT)
- `price` (DECIMAL(10,2))
- `original_price` (DECIMAL(10,2))
- `category` (ENUM: 'women', 'men', 'kids', 'accessories')
- `subcategory` (VARCHAR(100))
- `brand` (VARCHAR(100))
- `sku` (VARCHAR(100))
- `images` (JSON)
- `sizes` (JSON)
- `colors` (JSON)
- `in_stock` (BOOLEAN)
- `stock_quantity` (INT)
- `is_new` (BOOLEAN)
- `is_sale` (BOOLEAN)
- `is_featured` (BOOLEAN)
- `tags` (JSON)
- `weight` (DECIMAL(8,2))
- `dimensions` (JSON)
- `care_instructions` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Users Table
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `email` (VARCHAR(255), UNIQUE)
- `password` (VARCHAR(255))
- `role` (ENUM: 'admin', 'customer')
- `created_at` (TIMESTAMP)

### Orders Table
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `customer_name` (VARCHAR(255))
- `customer_email` (VARCHAR(255))
- `customer_phone` (VARCHAR(20))
- `items` (JSON)
- `total` (DECIMAL(10,2))
- `status` (ENUM: 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled')
- `shipping_address` (TEXT)
- `notes` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products?category=women` - Get products by category
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Auth
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token

## 🛠️ Development

### Adding New Products
1. Go to admin panel: http://localhost:3001
2. Login with admin credentials
3. Navigate to Products → Add Product
4. Fill in product details
5. Save - product appears on storefront immediately

### Customizing
- **Frontend**: Edit files in `src/`
- **Admin**: Edit files in `admin-panel/src/`
- **API**: Edit files in `server/`
- **Database**: Modify `server/db/connection.js`

## 🚀 Production Deployment

1. **Build all apps**:
   ```bash
   npm run build
   npm run build:admin
   npm run build:api
   ```

2. **Setup production MySQL** with proper credentials

3. **Deploy API server** with PM2 or similar

4. **Deploy frontend** to CDN/hosting

## 🔒 Security Notes

- Change default JWT secret in production
- Use environment variables for all secrets
- Implement proper CORS policies
- Add rate limiting
- Use HTTPS in production

## 📝 Features

✅ **Storefront**
- Product catalog with categories
- Product detail pages
- Shopping cart
- Responsive design

✅ **Admin Panel**
- Product management (CRUD)
- Order management
- User authentication
- Dashboard analytics

✅ **Backend API**
- RESTful API design
- JWT authentication
- MySQL database
- Error handling

✅ **Database**
- Optimized schema
- JSON fields for flexibility
- Proper indexing
- Auto-generated timestamps
