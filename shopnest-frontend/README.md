# ShopNest React Frontend

A responsive e-commerce frontend built with React, React Router DOM, Context API and Axios.

## Features

- Home, Products, Product Detail, Cart and Contact pages
- Dynamic product details using `useParams`
- Global cart state using Context API and `useContext`
- Add, increase, decrease and remove cart items
- Subtotal, 5% tax estimate and total
- Axios API integration with loading and error states
- Category filtering
- Responsive UI
- LocalStorage cart persistence
- Netlify SPA redirect configuration

## Temporary API

The frontend currently uses DummyJSON because the Phase 4 ShopNest backend is not available yet.

API URL is located in:

`src/api.js`

When the backend is taught, replace:

`https://dummyjson.com/products`

with the ShopNest backend URL.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

This project includes `public/_redirects` so React Router routes work on Netlify.
