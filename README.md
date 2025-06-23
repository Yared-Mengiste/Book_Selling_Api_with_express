# 🛠️ MongoDB Replica Set Setup Guide

## ✅ Why Set Up a Replica Set?

MongoDB **transactions** (like those used to process orders atomically) require the database to be running as a **replica set**, even if you're only running a **single MongoDB instance** in development.

### Key Benefits

- 🔄 **Multi-document transactions**: Enables rollback if any part of the process fails (e.g., deleting a book, creating an order).
- ✅ **Consistency**: Ensures atomicity across multiple collections.
- 🔐 **Production-ready foundation**: Prepares your app for scaling and failover in the future.

---

## 🧰 Prerequisites

- MongoDB installed (`mongod`, `mongosh`)
- Node.js & Mongoose
- Terminal/command line access

---

## ⚙️ Step-by-Step: Setting Up a Local Replica Set

### 1. Stop Any Running `mongod` Instances

If MongoDB is already running, stop it to restart with replica set config.

### 2. Start MongoDB with Replica Set Mode

```bash
mongod --dbpath /your/data/path --replSet rs0 --port 27017
```

> Replace `/your/data/path` with a real directory path for your MongoDB data.

If using a config file (`mongod.conf`), add:

```yaml
replication:
  replSetName: rs0
```

### 3. In a New Terminal, Connect with `mongosh`

```bash
mongosh --host localhost:27017
```

### 4. Initiate the Replica Set (Run Once)

Inside the `mongosh` shell:

```js
rs.initiate()
```

This creates a single-node replica set named `rs0`.

You can check the status with:

```js
rs.status()
```

---

## 🧼 Troubleshooting

- **"Transaction requires a replica set"**  
  → Make sure MongoDB was started with `--replSet` and `rs.initiate()` was run.

- **Buffering timed out / Server selection timeout**  
  → Double-check that the replica set is initialized (`rs.status()`).

---

## ✅ Summary

To support multi-document transactions in your app:

- Start MongoDB with `--replSet`
- Run `rs.initiate()` once
- Use `replicaSet=rs0` in your MongoDB connection string
