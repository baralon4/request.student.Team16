const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3006;

app.use(express.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const studentRequestsRouter = require("./routes/studentRequests");
const userRoutes = require("./routes/users");

app.use("/api", authRoutes);
app.use("/api/staff/requests", studentRequestsRouter);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

let appReadyPromise = null;
let server = null;

const INIT = {
  didInit: new Promise((resolve) => {
    appReadyPromise = resolve;
  }),
};

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      appReadyPromise();
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

module.exports = { app, INIT, server };
