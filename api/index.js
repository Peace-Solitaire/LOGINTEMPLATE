const express = require("express");
const cookieParser = require("cookie-parser");

/* ------------------------------- Deploy code for Render -------------------------------*/
const path = require("path");

const __dirname = path.resolve();
const app = express();

app.use(express.static(path.join(__dirname, "client/dist")));
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

/* ------------------------------- Deploy code for Render -------------------------------*/
app.use(express.json());
app.use(cookieParser());

const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db.js");
connectDB();

const userRoutes = require("./routes/userRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));