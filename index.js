require('dotenv').config();
const express = require('express');
const cors = require("cors");

const connection = require("./connection");
const userRoute = require("./routes/user");

const app = express();
const port = 3000;

const allowedOrigin = "http://localhost:5173";

app.use(cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();

app.use("/user", userRoute);

app.get('/', (req, res) => {
    res.send("hello world");
})

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})