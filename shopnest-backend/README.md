# ShopNest Backend (Phase 4)

Express + MongoDB/Mongoose backend for the ShopNest React/Vite frontend.

## 1. Requirements
- Node.js 18+
- MongoDB Atlas database (or local MongoDB)

## 2. Run locally
```bash
cd shopnest-backend
npm install
cp .env.example .env
```
Edit `.env`: set `MONGODB_URI` and a long random `JWT_SECRET`. Then:
```bash
npm run dev
```
API runs at `http://localhost:5000`; health check: `GET /`.

## 3. Create an admin account
Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env`, then run:
```bash
npm run seed:admin
```
Public registration always creates a `user`; it cannot assign itself admin privileges. Use the seeded admin credentials to log in and copy its JWT for admin-only routes.

Optional: seed 12 sample products for the React storefront:
```bash
npm run seed:products
```
This replaces existing product records, so run it only on a fresh/demo database.

## 4. API endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/products` | Public | List products; optional `?category=electronics&maxPrice=100` |
| GET | `/api/products/:id` | Public | Product details |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |
| POST | `/api/auth/register` | Public | Register user; returns JWT |
| POST | `/api/auth/login` | Public | Login; returns JWT |
| POST | `/api/orders` | User | Create order |
| GET | `/api/orders/my` | User | Fetch own orders with populated user details |
| PUT | `/api/orders/:id/status` | Admin | Set pending/shipped/delivered |

For protected routes, send `Authorization: Bearer YOUR_JWT_TOKEN`.

### Example request bodies
Register:
```json
{"name":"Test User","email":"test@example.com","password":"password123"}
```
Create product (admin):
```json
{"title":"Wireless Headphones","description":"Bluetooth headphones","price":49.99,"category":"electronics","brand":"ShopNest","thumbnail":"https://example.com/headphones.jpg","images":["https://example.com/headphones.jpg"],"rating":4.5,"stock":25}
```
Create order (logged-in user):
```json
{"items":[{"name":"Wireless Headphones","quantity":2,"price":49.99}]}
```
Update status (admin):
```json
{"status":"shipped"}
```

## 5. Connect the frontend
In `shopnest-frontend`, create `.env`:
```bash
VITE_API_URL=http://localhost:5000
```
The frontend's Axios base URL is configured in `src/api.js`. The product list endpoint returns `{ products: [...] }`, and product detail returns a product object, matching the current UI's expected shape. Restart Vite after changing `.env`.

For Netlify, add environment variable `VITE_API_URL` with the deployed Render service URL (no `/api` suffix), then trigger a new deploy. Add the exact Netlify site origin to backend `CLIENT_URLS`.

## 6. Deploy to Render
1. Push the `shopnest-backend` folder to a GitHub repository (or deploy this project root and set Render Root Directory to `shopnest-backend`).
2. Create a new Render Web Service, runtime Node.
3. Build command: `npm install`; Start command: `npm start`.
4. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` (`http://localhost:5173`), `CLIENT_URLS` (your Netlify origin), and `NODE_ENV=production`.
5. After deploy, open the service URL; it should return the ShopNest API health response.
6. Run `npm run seed:admin` locally with production MongoDB URI and admin credentials to provision the admin user. Do not commit `.env`.

## Notes
- Product writes and order status changes require both a valid JWT and `admin` role (403 otherwise).
- Passwords are hashed with bcrypt; login uses bcrypt.compare.
- Errors use JSON `{ success:false, message }` with appropriate status codes.
- CORS allows localhost:5173 and configured deployed frontend origins.
- For production checkout, validate product prices server-side and integrate a payment provider before accepting real payments. This assignment implementation calculates order totals from submitted item prices.
