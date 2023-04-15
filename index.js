const express = require("express");
const morgan = require("morgan");
const app = express();
const router = require("./routes/router");

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/files", router);
app.listen(8080, () => console.log("Server online at http://localhost:8080"));
//
