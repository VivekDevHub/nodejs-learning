## Refresh Token and Access Token 

## Authentication & Authorization Notes

> A complete backend authentication guide with password hashing, JWT, access tokens, refresh tokens, middleware, singleton authentication, and security best practices.
> 

---

# Authentication

Authentication is the process of verifying whether a user is genuine or not.

When a user logs into an application, the backend checks their credentials and decides whether access should be granted.

A secure authentication system is one of the most important parts of any backend application because it protects:

- User data
- Private routes
- Application resources

---

# Password Hashing

Passwords should never be stored in plain text inside the database.

Instead, passwords are converted into a hashed format using libraries like:

- `bcrypt`
- `argon2`

---

## Example

### Original Password

```
123456
```

### Hashed Password

```
$2b$10$h3k8d9s7f8h2....
```

Even if two users use the same password, `bcrypt` generates different hashes because it uses a unique salt internally.

---

# Why Hashing Is Important

1. Prevents password leaks
2. Protects user accounts if the database is compromised
3. Makes passwords unreadable
4. Improves overall application security

---

# Password Comparison

During login, the backend does not decode the hash.

Instead, it compares the entered password with the hashed password using bcrypt comparison methods.

---

## Flow

```
Entered Password
        ↓
Compare With Hash
        ↓
     Match
        ↓
 Login Success
```

---

# Complete Authentication Flow

# Register Flow

## Step-by-Step

1. User fills the registration form
2. Frontend sends data to backend
3. Backend checks whether the user already exists
4. Password gets hashed
5. User data is saved in database
6. Success response is returned

---

# Login Flow

## Step-by-Step

1. User enters email and password
2. Backend finds the user from database
3. Password is compared
4. If valid, tokens are generated
5. Tokens are sent to frontend
6. User gets authenticated

---

# JWT Authentication

JWT stands for JSON Web Token.

It is a token-based authentication mechanism where:

- The server generates a token
- The client sends that token with every protected request

---

# Structure of JWT

A JWT contains three parts:

```
header.payload.signature
```

---

# JWT Payload Example

```
{
  "id":"123",
  "role":"student"
}
```

---

# Access Token

An access token is a short-lived token used to access protected routes.

---

## Common Expiry Time

- 15 minutes
- 30 minutes
- 1 hour

---

## Purpose

- Access protected APIs
- Verify authenticated users
- Carry user identity information

---

# Access Token Flow

## Login

When the user logs in successfully:

1. Backend generates access token
2. Frontend stores token
3. Frontend sends token in headers

---

## Request Example

```
Authorization: Bearer access_token
```

---

# Refresh Token

A refresh token is a long-lived token used to generate new access tokens when the old access token expires.

---

## Common Expiry Time

- 7 days
- 30 days
- 90 days

---

# Why Refresh Tokens Are Used

Without refresh tokens, users would need to log in again every time the access token expires.

Refresh tokens improve user experience while keeping access tokens short-lived for security.

---

# Access Token + Refresh Token Flow

# Login

Backend generates:

1. Access Token
2. Refresh Token

---

# API Requests

Frontend sends access token with requests.

---

# Access Token Expired

When the access token expires:

1. Frontend calls refresh endpoint
2. Backend verifies refresh token
3. Backend generates new access token
4. User continues without logging in again

---

# Refresh Token Endpoint

```
POST /refresh-token
```

---

# Middleware Authentication

Middleware is used to protect routes.

It runs before the controller and verifies whether the user is authenticated.

---

# Middleware Flow

```
Request
   ↓
Auth Middleware
   ↓
Protected Route
```

---

# Middleware Responsibilities

1. Extract token from headers
2. Verify token
3. Decode user information
4. Attach user to request object
5. Call next middleware or controller

---

# Example Protected Route Flow

```
Frontend Request
        ↓
 Auth Middleware
        ↓
 Token Verification
        ↓
 User Authorized
        ↓
Controller Executes
```

---

# Singleton Token Authentication

Singleton token authentication means a user can have only one active session at a time.

If the user logs in from another device, the old session becomes invalid automatically.

---

# Singleton Token Flow

# Login

1. User logs in
2. Backend generates token
3. Token is stored in database

---

## Example

```
user.token=generatedToken
```

---

# Protected Request

Middleware compares:

```
Incoming Token === Database Token
```

If both tokens match:

Access Granted

Otherwise:

Access Denied

---

# Second Login

If the same user logs in from another device:

1. New token is generated
2. Old token is replaced
3. Previous device becomes logged out automatically

---

# Advantages of Singleton Token Authentication

1. Only one active session per user
2. Better account security
3. Easy session invalidation
4. Prevents account sharing
5. Better session control

---

# Disadvantages of Singleton Token Authentication

1. Multi-device login is not supported
2. Users may need to log in again frequently
3. Requires extra database checks

---

# Logout Flow

# Normal Logout

1. Frontend sends logout request
2. Backend removes refresh token
3. Token becomes invalid
4. User session ends

---

# Common Authentication Routes

## Register

```
POST /register
```

---

## Login

```
POST /login
```

---

## Refresh Token

```
POST /refresh-token
```

---

## Logout

```
POST /logout
```

---

## User Profile

```
GET /me
```

---

# Best Practices for Secure Authentication

# Password Security

1. Always hash passwords
2. Use `bcrypt` or `argon2`
3. Never store plain passwords

---

# Token Security

1. Keep access token expiry short
2. Store refresh token securely
3. Use HTTP-only cookies
4. Use strong JWT secrets

---

# Backend Security

1. Protect sensitive routes
2. Use authentication middleware
3. Validate all inputs
4. Implement rate limiting
5. Configure CORS properly

---

# Environment Variables

Sensitive values should always be stored in `.env`

---

## Example

```
JWT_SECRET=mySuperSecretKey
REFRESH_SECRET=myRefreshSecret
```

---

# Basic Backend Authentication Structure

```
src
┣ controllers
┣ routes
┣ middleware
┣ models
┣ services
┣ utils
┗ server.js
```

---

# Complete Authentication Lifecycle

```
Register
    ↓
Password Hashing
    ↓
User Saved In Database
    ↓
Login
    ↓
Access Token Generated
    ↓
Protected API Access
    ↓
Access Token Expired
    ↓
Refresh Token Generates New Access Token
    ↓
Logout
```

---

# Conclusion

Authentication is a critical part of backend development.

- Access tokens provide secure short-term authorization
- Refresh tokens help maintain user sessions without repeated logins
- Singleton token authentication adds an extra layer of security by ensuring only one active session exists per user

A properly designed authentication system improves both:

- Application Security
- User Experience