# Introduction to Database

**Mongoose & MongoDB**

**Mongoose**

Mongoose is a library used with Node.js to interact with MongoDB in a structured and organized way.

- It acts as a **bridge between your backend and database**
- Helps you write **clean, readable code instead of raw queries**
- Provides features like:
    - Data validation
    - Schema-based structure
    - Better data handling

---

**Schema**

A **Schema** defines the structure of data in MongoDB.

- It specifies:
    - Fields (what data will be stored)
    - Data types
    - Validation rules

**Example:**

```
importmongoosefrom"mongoose";

constuserSchema=newmongoose.Schema({
  name: { type:String, required:true },
  email: { type:String, required:true, unique:true },
  age: { type:Number, default:18 },
});
```

**Important:**

A schema is only a **blueprint**. It does **not directly interact with the database**.

---

**Model**

A **Model** is created from a schema and is used to interact with the database.

```
constUser=mongoose.model("User",userSchema);
```

The model provides methods for **CRUD operations**:

**Create**

```
awaitUser.create({ name:"Abdur", email:"abdur@gmail.com" });
```

**Read**

```
constusers=awaitUser.find();
```

**Update**

```
awaitUser.updateOne(
  { email:"abdur@gmail.com" },
  { age:25 }
);
```

**Delete**

```
awaitUser.deleteOne({ email:"abdur@gmail.com" });
```

---

**Cluster**

A **Cluster** is the infrastructure where your database is stored.

- It is a group of servers that:
    - Store your data
    - Keep it available online
- Key benefits:
    - Scalability
    - Backup support
    - High availability

---

**MongoDB Atlas**

MongoDB Atlas is a cloud platform used to host MongoDB databases.

- It allows you to:
    - Create and manage clusters
    - Store data in the cloud
    - Connect your backend easily

**Example Connection:**

```
importmongoosefrom"mongoose";

mongoose.connect("mongodb+srv://username:password@cluster.mongodb.net/dbname")
.then(() =>console.log("Connected"))
.catch(err =>console.log(err));
```

---

**Final Flow (Understanding the Architecture)**

- **Schema** → Defines data structure
- **Model** → Performs database operations
- **Mongoose** → Manages interaction between backend and database
- **Cluster** → Stores the data
- **MongoDB Atlas** → Hosts everything in the cloud