// index.js
const express = require('express');
const app = express();
// parse application/json
app.use(require('body-parser').json());
// register endpoints
require('./api/index')(app);
app.listen(3333, () => {
    console.log('server started!');
});