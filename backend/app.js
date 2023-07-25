const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/data', (req, res) => {
    console.log('I received a POST request');
    res.send('I received your POST request. This is how you can send back a response.');
})

app.listen(5000, () => {
    console.log('Server is running on port 3000');
})