const express = require('express');
const parseFilters = require('./src/middleware/parseFilters');
const parseSorts = require('./src/middleware/parseSorts');
require('dotenv').config();
const corsConfig = require('./src/configs/cors');
const connectDB = require('./src/configs/db');
const route = require('./src/routes');

connectDB();

// app
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(corsConfig);
// var cors = require('cors');
// app.use(cors());

app.use(parseFilters, parseSorts);

// route
app.use('/api', route);
app.get('/', (req, res) => {
    res.json('Hello world 12345!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Example app listening on PORT ${PORT}`);
});
