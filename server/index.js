const app = require("express")();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

// Dotenv Configuration
dotenv.config({ path: "config/.env" });

// PORT
const PORT = process.env.PORT || 8001;

// Using Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database Connection
require("./db/connection")

app.get("/", (req, res) => {
    res.status(200).json({ status: "OK" });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})