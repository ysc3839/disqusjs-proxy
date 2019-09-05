const express = require('express');
const api = require('./api');
const config = require('./config.json');
const PORT = process.env.PORT || 3000;

const app = express();

app.use('/disqus/', api(config));
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
