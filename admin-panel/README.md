# LUXE Admin Panel

A comprehensive admin dashboard for managing the LUXE e-commerce platform built with React, TypeScript, and Firebase.

## Features

- **Authentication**: Secure email/password login with Firebase Auth
- **Dashboard**: Overview of orders, products, customers, and revenue
- **Product Management**: Add, edit, and manage product catalog
- **Order Management**: Track and manage customer orders with WhatsApp integration
- **Customer Management**: View customer details and contact via WhatsApp
- **Settings**: Configure store settings, pricing, and notifications

## Setup Instructions

1. **Install Dependencies**
   ```bash
   cd admin-panel
   npm install
   ```

2. **Configure Firebase**
   - Update `src/config/firebase.ts` with your Firebase configuration
   - Replace the placeholder values with your actual Firebase project credentials:
     ```typescript
     const firebaseConfig = {
       apiKey: "your-actual-api-key",
       authDomain: "your-project.firebaseapp.com",
       projectId: "your-project-id",
       storageBucket: "your-project.appspot.com",
       messagingSenderId: "123456789",
       appId: "your-app-id"
     };
     ```

3. **Set up Firebase Authentication**
   - Enable Email/Password authentication in Firebase Console
   - Create an admin user account

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

## Firebase Configuration Required

You need to provide the following Firebase configuration keys:

- `apiKey`: Your Firebase API key
- `authDomain`: Your Firebase auth domain
- `projectId`: Your Firebase project ID
- `storageBucket`: Your Firebase storage bucket
- `messagingSenderId`: Your Firebase messaging sender ID
- `appId`: Your Firebase app ID

## Default Login Credentials

For development/testing purposes:
- Email: admin@luxe.com
- Password: admin123

**Note**: Make sure to create this user in your Firebase Authentication console or update the credentials in the Login component.

## Project Structure

```
admin-panel/
├── src/
│   ├── components/          # Reusable components
│   ├── contexts/           # React contexts (Auth)
│   ├── pages/              # Page components
│   ├── types/              # TypeScript type definitions
│   ├── config/             # Firebase configuration
│   └── App.tsx             # Main app component
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## Technologies Used

- **React 18** with TypeScript
- **Firebase** (Auth, Firestore, Storage)
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Vite** for build tooling

## Features Overview

### Dashboard
- Real-time statistics and metrics
- Recent orders overview
- Top-selling products
- Quick action buttons

### Products
- Product catalog management
- Category-based filtering
- Search functionality
- Add/Edit/Delete products

### Orders
- Order tracking and management
- Status updates
- WhatsApp integration for customer communication
- Order details and history

### Customers
- Customer database
- Contact information
- Order history per customer
- WhatsApp communication

### Settings
- Store configuration
- Pricing and shipping settings
- Notification preferences
- API key management