const express = require('express');

const app = express();

app.use((req, res) => {
    console.log('Not found...');
});

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});