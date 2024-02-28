const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");

const __dirname10 = path.resolve();
dotenv.config();

const connectDB = require("./config/db.js");
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname10, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname10, "client", "dist", "index.html"));
});

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
