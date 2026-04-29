/**
 * Code Standards and Best Practices
 * Applied to this ecommerce project
 */

## 1. API Endpoints Management
- ✅ Centralized API endpoints in `src/constants/api.js`
- ✅ Never hardcode URLs in components
- ✅ Use dynamic endpoints for parameterized routes

## 2. Console Logging
- ❌ Remove all `console.log()` debug statements from production code
- ✅ Use conditional logging only for development environment if needed
- ✅ Handle errors gracefully without logging sensitive data

## 3. Component Naming & Structure
- ✅ Use PascalCase for component names
- ✅ One component per file
- ✅ Keep components focused and single-responsibility

## 4. Import Organization
- ✅ Group imports by category (React, third-party, local)
- ✅ Avoid unused imports
- ✅ Keep imports alphabetically ordered within groups

## 5. Error Handling
- ✅ Catch all promise rejections
- ✅ Provide user-friendly error messages with toast notifications
- ✅ Avoid logging raw error objects

## 6. Code Formatting
- ✅ Use 2-space indentation
- ✅ Remove trailing whitespace
- ✅ Use consistent quote style (single quotes for strings)
- ✅ Use arrow functions for callbacks

## 7. State Management
- ✅ Keep state minimal and atomic
- ✅ Use Context API for global state (Auth, Cart, Wishlist)
- ✅ Avoid prop drilling; use context when needed

## 8. Async/Await Patterns
- ✅ Use try/catch for error handling
- ✅ Avoid nested promise chains
- ✅ Use async/await syntax for clarity

## 9. Constants
- ✅ Define magic strings as constants
- ✅ Use APP_CONFIG for app-wide settings
- ✅ Use API_ENDPOINTS for all API calls

## 10. Comments
- ✅ Use meaningful comments for complex logic
- ✅ Document function purposes
- ✅ Remove obsolete/debug comments

## Applied Refactoring Changes:
1. Created `src/constants/api.js` for centralized API management
2. Removed all `console.log()` and `console.error()` statements
3. Updated all components to use API constants
4. Standardized error handling patterns
5. Improved code formatting and spacing
6. Removed unused state and effects
7. Standardized localStorage key usage via constants
