# Redis with Caching Notes

## Introduction to Redis

Redis is an in-memory database used for ultra-fast data storage and retrieval.

It is commonly used for:

- Caching
- Session Storage
- Real-Time Analytics
- Pub/Sub Messaging
- Queue Management

Redis stores data in RAM, which makes it much faster than traditional databases.

---

# What is Caching?

Caching means storing frequently used data temporarily so the server can return data quickly without querying the database repeatedly.

## Without Cache

```
Client → Server → Database → Response
```

Every request hits the database, which increases:

- Response Time
- Database Load
- Server Cost

---

## With Cache

```
Client → Server → Redis Cache → Response
```

### If data exists in Redis:

- Data is returned instantly
- Database is not queried

### If data does not exist:

1. Fetch from database
2. Store in Redis
3. Return response

---

# Why Redis is Used for Caching

## Advantages

### Extremely Fast

Redis works in memory, so response time is in milliseconds.

### Reduces Database Load

Frequently requested data is served from cache instead of the database.

### Improves Performance

Applications become faster and more scalable.

### Supports Expiration Time

Data can automatically expire after a specific time.

### Easy Integration

Works easily with:

- Node.js
- Express.js
- Python
- Java
- Django
- Spring Boot

---

# Redis Data Flow

1. Client sends request
2. Server checks Redis cache
3. If cache exists → return cached data
4. If cache missing → fetch from database
5. Store data in Redis
6. Send response to client

---

# Installing Redis

## Windows

Use:

- WSL
- Docker

---

## Linux

```bash
sudo apt update
sudo apt install redis
```

## Start Redis Server

```bash
redis-server
```

## Check Redis Connection

```bash
redis-cli
```

---

# Redis Basic Commands

## Set Data

```bash
SET name "Rahman"
```

## Get Data

```bash
GET name
```

## Delete Data

```bash
DEL name
```

## Check All Keys

```bash
KEYS *
```

## Set Expiry Time

```bash
SETEX user 60 "data"
```

### Explanation

- `60` = seconds
- Data automatically deletes after 60 seconds

---

# Redis with Node.js

## Install Package

```bash
npm install redis
```

---

# Connecting Redis

```jsx
import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => {
  console.log("Redis Error", err);
});

await client.connect();

export default client;
```

---

# Simple Caching Example

## Without Cache

```jsx
app.get("/users", async (req, res) => {

  const users = await User.find();

  res.json(users);

});
```

Every request hits the database.

---

## With Redis Cache

```jsx
app.get("/users", async (req, res) => {

  const cachedUsers = await client.get("users");

  if (cachedUsers) {
    return res.json(JSON.parse(cachedUsers));
  }

  const users = await User.find();

  await client.set("users", JSON.stringify(users));

  res.json(users);

});
```

---

# Caching with Expiry Time

```jsx
await client.setEx(
  "users",
  60,
  JSON.stringify(users)
);
```

## Meaning

- Cache stored for 60 seconds
- After 60 seconds Redis removes data automatically

---

# Cache Hit vs Cache Miss

## Cache Hit

Data found in Redis.

### Result

- Fast response
- No database query

---

## Cache Miss

Data not found in Redis.

### Process

1. Fetch from database
2. Store in Redis
3. Return response

---

# Real-World Example

## E-Commerce Website

Frequently accessed data:

- Product Lists
- Product Details
- Categories
- Trending Products

Instead of querying the database thousands of times:

- Store data in Redis
- Serve cached responses

### Result

- Faster website
- Better scalability
- Reduced server load

---

# Redis Cache Invalidation

When database data changes, cache should also update.

## Example

```jsx
await client.del("users");
```

This removes old cached data.

---

# Common Use Cases

## API Response Caching

Store API responses temporarily.

## Authentication Sessions

Store user sessions and tokens.

## OTP Storage

Store OTPs with expiration time.

## Rate Limiting

Limit requests per user/IP.

## Real-Time Applications

Chats and live notifications.

---

# Advantages of Redis Caching

| Feature | Benefit |
| --- | --- |
| In-Memory Storage | Ultra Fast |
| Expiration Support | Auto Cleanup |
| Reduces DB Load | Better Scalability |
| Easy Integration | Developer Friendly |
| High Performance | Faster APIs |

---

# Limitations

## Data Stored in RAM

RAM is expensive compared to disk storage.

## Temporary Storage

If the Redis server restarts and persistence is disabled, data may be lost.

## Not Suitable for Permanent Data

Usually used alongside databases like:

- MongoDB
- PostgreSQL
- MySQL

---

# Redis vs Traditional Database

| Redis | Traditional Database |
| --- | --- |
| In-Memory | Disk-Based |
| Very Fast | Slower |
| Temporary Storage | Permanent Storage |
| Used for Caching | Used for Main Data |

---

# Interview Questions

## What is Redis?

Redis is an in-memory database mainly used for caching and fast data access.

---

## Why is Redis Faster?

Because it stores data in RAM instead of disk.

---

## What is Cache Hit?

When requested data is found in Redis cache.

---

## What is Cache Miss?

When data is not found in cache and is fetched from the database.

---

## Why Use Expiration Time in Redis?

To automatically remove old or unused cached data.

---

## Difference Between Redis and MongoDB

| Redis | MongoDB |
| --- | --- |
| In-Memory | Document Database |
| Used for Caching | Used for Permanent Storage |
| Faster | Slower than Redis |

---

# Important Points

- Redis is mostly used for caching
- Redis stores data in memory
- Cache improves API performance
- `setEx()` is used for expiry time
- Redis reduces database traffic
- Cache invalidation is important
- Redis is widely used in scalable applications

---

# Short Definitions

## Redis

Redis is a fast in-memory database mainly used for caching, session storage, and real-time applications.

## Caching

Caching is the process of storing frequently accessed data temporarily for faster access.