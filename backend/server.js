const express = require("express");
const axios = require('axios');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 4500;
const url = 'http://coding-assignment.bombayrunning.com/data.json';
let corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        res.json({ error: false, data, message: "Welcome to API" });
    } catch (error) {
        // console.error(`Error: ${error.message}`);
        res.json({ error: true, message: "error.message" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
