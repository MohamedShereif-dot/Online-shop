/**
 * API Configuration and Constants
 * Centralized API endpoints for the ecommerce application
 */

const API_BASE_URL = 'https://ecommerce.routemisr.com/api/v1';

export const API_ENDPOINTS = {
  // Authentication
  SIGNIN: `${API_BASE_URL}/auth/signin`,
  SIGNUP: `${API_BASE_URL}/auth/signup`,

  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_DETAILS: (id) => `${API_BASE_URL}/products/${id}`,

  // Categories
  CATEGORIES: `${API_BASE_URL}/categories`,

  // Brands
  BRANDS: `${API_BASE_URL}/brands`,

  // Cart
  CART: `${API_BASE_URL}/cart`,
  CART_ITEM: (productId) => `${API_BASE_URL}/cart/${productId}`,

  // Orders
  ORDERS: (cartId) => `${API_BASE_URL}/orders/${cartId}`,
  CHECKOUT_SESSION: (cartId) => `${API_BASE_URL}/orders/checkout-session/${cartId}?url=http://localhost:5173`,

  // Wishlist
  WISHLIST: `${API_BASE_URL}/wishlist`,
  WISHLIST_ITEM: (productId) => `${API_BASE_URL}/wishlist/${productId}`,
};

export const APP_CONFIG = {
  REDIRECT_URL: 'http://localhost:5173',
  TOKEN_KEY: 'userToken',
  CART_STORAGE_KEY: 'cartItems',
};
