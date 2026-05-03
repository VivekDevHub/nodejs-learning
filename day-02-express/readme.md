# REST API & Express

**REST APIs – Complete Notes**

**🔹 What is a REST API?**

A **REST API (Representational State Transfer API)** is a web service that allows communication between frontend and backend over HTTP using standard methods.

<aside>
💡

In simple terms:

It is a way for the **client (frontend)** and **server (backend)** to communicate and perform operations like **Create, Read, Update, Delete (CRUD)** on data.

</aside>

---

**🔹 Key Concepts of REST APIs**

**1. Representation**

The format in which data is exchanged between client and server.

- Common formats:
    - JSON (most used)
    - XML
    - HTML

---

**2. Stateless Communication**

- Each request is **independent**
- The server does **not remember previous requests**
- Every request must contain all required information (e.g., authentication token)

---

**3. HTTP Methods**

Standard request types used to perform operations on resources.

| Method | Definition | Use Case |
| --- | --- | --- |
| **GET** | Retrieve data from server | Fetch users, products |
| **POST** | Create new resource | Signup, create order |
| **PUT** | Fully update resource | Update complete profile |
| **PATCH** | Partially update resource | Update name/email |
| **DELETE** | Remove resource | Delete user/product |

---

**🔹 HTTP Status Codes**

Status codes indicate the result of a request.

---

**Success Codes (2xx)**

| Code | Name | Meaning | When to Use |
| --- | --- | --- | --- |
| **200** | OK | Request successful | Data fetched successfully |
| **201** | Created | Resource created | User/order created |
| **204** | No Content | Success, no response body | Delete success |

---

**Client Error Codes (4xx)**

| Code | Name | Meaning | Example |
| --- | --- | --- | --- |
| **400** | Bad Request | Invalid input | Missing fields |
| **401** | Unauthorized | Auth required/invalid | Login required |
| **403** | Forbidden | No permission | Access denied |
| **404** | Not Found | Resource not found | Wrong ID |
| **409** | Conflict | Resource conflict | Email already exists |
| **422** | Unprocessable Entity | Validation failed | Invalid data format |

---

**Server Error Codes (5xx)**

| Code | Name | Meaning | Example |
| --- | --- | --- | --- |
| **500** | Internal Server Error | Server crash/error | Backend issue |
| **503** | Service Unavailable | Server overloaded/down | Maintenance |

---

**🔹 Important Rules**

1. **2xx → Success responses**
2. **4xx → Client-side mistakes**
3. **5xx → Server-side errors**