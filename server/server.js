const express = require("express");
const app = express();

const connectDB = require("../config/db");

// when we deploy our app to cloud, the server has PORT already defined.
// So dont override that PORT if its available.
const PORT = process.env.PORT || 5000

connectDB();

app.get("/", (req, res) => {
    res.send("My server is set up");
});

app.listen(PORT, ()=> {
    console.log(`server is listening on PORT ${PORT}`);
});
