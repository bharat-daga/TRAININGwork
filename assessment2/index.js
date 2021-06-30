const express = require("express");
const app = express();
const route = require("./routes/route");

app.use("/post", route);

app.listen(5000, () => console.log("Server Started at http://localhost:6000/"));
