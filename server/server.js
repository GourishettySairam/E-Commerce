const express = require("express");
const app = express();

const connectDB = require("./config/db");

// when we deploy our app to cloud, the server has PORT already defined.
// So dont override that PORT if its available.
const PORT = process.env.PORT || 5000

// Connect to MongoDB
connectDB();

// use indicates, we are using a middleware
// Below statement helps us to log our msgs to console
app.use(express.json({extended: false}));

// If the path matches 1st param, then go to routes/userApi file
app.use("/api/users", require("./routes/userApi"));

// If the path matches 1st param, then go to routes/productsApi file
app.use("/api/products", require("./routes/productsApi"));

app.use("/api/auth", require("./routes/authApi"));

app.get("/", (req, res) => {
    res.send("My server is set up");
});

app.listen(PORT, ()=> {
    console.log(`server is listening on PORT ${PORT}`);
});
