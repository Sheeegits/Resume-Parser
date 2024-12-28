const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes.js");
const { setupSocket } = require("./sockets/notifications.js");
const connectDB = require("./config/db.js");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

// Connect to MongoDB
connectDB();

server.listen(8000, () => console.log("Server running on port 8000"));
