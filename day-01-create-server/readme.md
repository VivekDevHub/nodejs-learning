# Backend Introduction

**1. What is Backend?**

The **backend** is the part of a web application that users cannot see. It handles all operations behind the scenes.

**Key Responsibilities:**

- Storing and managing data (database)
- Handling authentication (login/signup)
- Creating and managing APIs
- Running application logic

**Concept:**

- **Frontend** → What users see and interact with
- **Backend** → What runs behind the scenes

---

**2. What is a Server?**

A **server** is a system (hardware or software) that receives requests and sends responses.

**Flow:**

- **Client (browser/app)** → Sends request
- **Server** → Processes the request
- **Server** → Sends response

When you open a website, your browser requests data from the server, and the server responds with the required resources.

---

**3. Creating a Server using Node.js (HTTP Module)**

Using Node.js, you can create a basic server with the built-in HTTP module.

**Step 1: Initialize Project**

```
npm init-y
```

**Step 2: No Installation Required**

The HTTP module is built into Node.js.

**Step 3: Create Server**

```
lethttp=require("http");

letserver=http.createServer((req,res) => {
res.end("hey... you got it...");
});

server.listen(3000, () => {
console.log("Server is running on port 3000");
});
```

**Step 4: Run Server**

```
node server.js
```

**Step 5: Open in Browser**

```
http://localhost:3000
```

---

**4. Protocols (How Data Travels)**

Protocols define how data moves between client and server.

**Step-by-Step Flow:**

1. **DNS (Domain Name System)**
Converts a domain name into an IP address
2. **TCP (Transmission Control Protocol)**
Establishes a connection between client and server
3. **TLS/SSL (Security Layer)**
Encrypts the connection for secure communication
4. **HTTP/HTTPS**
Handles request and response exchange
5. **Backend Processing**
Server processes the request (logic + database)
6. **Response Sent Back**
Data is returned to the client
7. **TCP Connection Closed**
Connection is terminated