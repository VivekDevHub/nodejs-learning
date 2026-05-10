# **Backend Register Authentication**

## What is Register Authentication?

Register authentication means creating a new user account securely in the backend.

When a user signs up:

- The backend receives user data
- Validates the input fields
- Hashes the password
- Stores the user securely in the database

The main goal is **security**, because passwords should never be stored in plain text.

---

# Complete Backend Register Flow

```
Client Sends Data
        ↓
Backend Receives Request
        ↓
Validate Input Fields
        ↓
Check Existing User
        ↓
Hash Password Using bcrypt
        ↓
Save User in Database
        ↓
Send Success Response
```

---

# Step 1 — Client Sends Data

The frontend sends user data to the backend using a **POST request**.

## Example Request Body

```
{
name:"Abdur",
email:"abdur@gmail.com",
password:"123456"
}
```

This data usually comes from a signup form.

---

# Step 2 — Backend Receives Request

The backend receives the data using `req.body`.

## Example

```
const { name, email, password }=req.body;
```

Here, the backend extracts values from the request body.

---

# Step 3 — Validate Input Fields

Before doing anything, the backend checks whether all required fields are present or not.

## Example Validation

```
if (!name||!email||!password) {
returnres.status(400).json({
    message:"All fields are required"
  });
}
```

---

# Why Validation is Important

Validation prevents invalid or empty data from entering the database.

## Problems Without Validation

- Empty email
- Empty password
- Missing name

Without validation, the database can contain broken or useless data.

---

# Step 4 — Check Existing User

Before creating a new account, the backend checks whether the email already exists.

## Example

```
constexistingUser=awaitUser.findOne({ email });
```

## If User Already Exists

```
if (existingUser) {
returnres.status(409).json({
    message:"User already exists"
  });
}
```

---

# Why This Step is Important

Every user should have a unique email.

Without this check, multiple accounts can be created using the same email.

---

# Step 5 — Hash the Password

This is the most important security step.

Never store the original password directly in the database.

---

# Wrong Way

```
password:"123456"
```

If the database gets leaked, hackers can see every password.

---

# Correct Way — Use bcrypt Hashing

```
consthashedPassword=awaitbcrypt.hash(password,10);
```

---

# What is Hashing?

Hashing converts a normal password into a secure unreadable string.

## Example

```
123456
↓
$2b$10$hjshdjhsjdhsjd...
```

The original password cannot be easily recovered from the hash.

---

# Why Same Password Gives Different Hashes

bcrypt adds **salt** internally.

## Example

```
123456 → $2b$10$abc...
123456 → $2b$10$xyz...
```

Even though the passwords are the same, the hashes are different.

This improves security because attackers cannot easily detect repeated passwords.

---

# What is Salt?

Salt is random data added before hashing.

bcrypt automatically generates salt internally, making every hash unique.

---

# What Does `10` Mean in bcrypt?

```
bcrypt.hash(password,10)
```

`10` is called **salt rounds**.

Higher rounds mean:

- More security
- Slower hashing

## Commonly Used Values

- 10
- 12

---

# Step 6 — Save User in Database

After hashing the password, save the user in the database.

## Example

```
awaitUser.create({
  name,
  email,
  password:hashedPassword
});
```

Notice that only the hashed password is stored.

---

# Step 7 — Send Response

After successful registration, send a success response.

## Example

```
res.status(201).json({
  success:true,
  message:"User registered successfully"
});
```

---

# Never Send Password in Response

## Wrong

```
{
password:"123456"
}
```

## Correct

```
{
success:true
}
```

---

# Complete Backend Register Controller

```
importbcryptfrom"bcrypt";
importUserfrom"../models/user.model.js";

exportconstregisterUser=async (req,res) => {
try {

const { name, email, password }=req.body;

// Validation
if (!name||!email||!password) {
returnres.status(400).json({
        message:"All fields are required"
      });
    }

// Existing user check
constexistingUser=awaitUser.findOne({ email });

if (existingUser) {
returnres.status(409).json({
        message:"User already exists"
      });
    }

// Password hashing
consthashedPassword=awaitbcrypt.hash(password,10);

// Save user
awaitUser.create({
      name,
      email,
      password:hashedPassword
    });

// Success response
returnres.status(201).json({
      success:true,
      message:"User registered successfully"
    });

  }catch (error) {

returnres.status(500).json({
      message:error.message
    });

  }
};
```

---

# Important Concepts Summary

---

## `req.body`

Used to receive data from the client.

```
const { email, password }=req.body;
```

---

## `bcrypt.hash()`

Used to convert a password into a secure hash.

```
bcrypt.hash(password,10);
```

---

## Hashing

Converts a readable password into an unreadable secure string.

---

## Salt

Random value added internally by bcrypt to make hashes unique.

---

## Validation

Checks whether the input data is correct or not.

---

## Existing User Check

Prevents duplicate accounts using the same email.

---

# Final Backend Register Flow

```
Frontend Sends User Data
        ↓
Backend Receives req.body
        ↓
Validate Fields
        ↓
Check Existing Email using findOne({email})
        ↓
Hash Password Using bcrypt.hash(password,10)
        ↓
Store User in Database 
        ↓
Token Generation jwt.sign({id:newUser, JWT_KEY, expiresIn:"1h"})
        ↓
Save in Cookies  res.cookie("id_card",token)
        ↓
Send Success Response
```