# MongoDB Atlas Setup Guide

This guide will walk you through setting up MongoDB Atlas for your Saltier application.

## Prerequisites

- A MongoDB Atlas account (free tier available)
- Node.js and npm installed
- Basic understanding of environment variables

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account (or log in if you already have one)
3. Complete the registration process

## Step 2: Create a Cluster

1. After logging in, click **"Build a Database"** or **"Create"** button
2. Choose **"M0 FREE"** (Free Shared Cluster) - perfect for development
3. Select your preferred cloud provider and region (choose closest to you)
4. Click **"Create"** and wait for the cluster to be created (takes 1-3 minutes)

## Step 3: Create Database User

1. In the **"Database Access"** section (left sidebar), click **"Add New Database User"**
2. Choose **"Password"** authentication method
3. Enter a username (e.g., `saltier-admin`)
4. Click **"Autogenerate Secure Password"** or create your own strong password
5. **IMPORTANT**: Copy and save this password - you'll need it for the connection string!
6. Under **"Database User Privileges"**, select **"Read and write to any database"**
7. Click **"Add User"**

## Step 4: Configure Network Access

1. In the **"Network Access"** section (left sidebar), click **"Add IP Address"**
2. For development, click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
   - **Note**: For production, you should whitelist specific IPs
3. Click **"Confirm"**

## Step 5: Get Your Connection String

1. Go back to **"Database"** section (left sidebar)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as the driver
5. Copy the connection string (it looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 6: Configure Your Application

1. In your project root, create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and update the connection string:
   ```env
   MONGODB_URI=mongodb+srv://saltier-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/saltier?retryWrites=true&w=majority
   PORT=3001
   VITE_API_URL=http://localhost:3001/api
   ```

   **Replace:**
   - `saltier-admin` with your database username
   - `YOUR_PASSWORD` with your database password (URL-encode special characters)
   - `cluster0.xxxxx` with your actual cluster address
   - The database name `saltier` is optional but recommended

## Step 7: Install Dependencies & Run

1. Install all dependencies (if not already done):
   ```bash
   npm install
   ```

2. Start the backend server:
   ```bash
   npm run dev:server
   ```

   You should see:
   ```
   MongoDB Connected: cluster0.xxxxx.mongodb.net
   Server is running on port 3001
   ```

3. In a new terminal, start the frontend:
   ```bash
   npm run dev
   ```

   Or run both together:
   ```bash
   npm run dev:all
   ```

## Step 8: Seed Initial Data (Optional)

Once your server is running, you can seed the database with default appetizers:

1. Make a POST request to `http://localhost:3001/api/appetizers/seed`
   - Using curl:
     ```bash
     curl -X POST http://localhost:3001/api/appetizers/seed
     ```
   - Or use Postman/Insomnia
   - Or visit the admin dashboard and use the reset feature

## Troubleshooting

### Connection Issues

- **"Authentication failed"**: Check your username and password in the connection string
- **"IP not whitelisted"**: Make sure you've added your IP (or 0.0.0.0/0) in Network Access
- **"Connection timeout"**: Check your internet connection and firewall settings

### URL Encoding Special Characters

If your password contains special characters, you need to URL-encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`
- `&` becomes `%26`
- `+` becomes `%2B`
- `=` becomes `%3D`

Example: If password is `P@ssw0rd#123`, use `P%40ssw0rd%23123`

### Database Not Found

- The database will be created automatically when you first insert data
- Make sure the connection string includes the database name: `/saltier`

## Production Considerations

1. **Security**: Never commit `.env` file to git (already in `.gitignore`)
2. **IP Whitelisting**: Whitelist only your production server IPs
3. **Database User**: Create a separate user with limited permissions for production
4. **Connection String**: Use environment variables in your hosting platform
5. **Backup**: Set up automated backups in MongoDB Atlas

## Next Steps

- Your app is now connected to MongoDB Atlas!
- All data (appetizers and coupons) will be stored in the cloud
- Data persists across sessions and devices
- You can view your data in MongoDB Atlas dashboard under "Collections"

## Support

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

