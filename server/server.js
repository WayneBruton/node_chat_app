const path = require('path');//comes with node and does not need to be installed
const express = require('express');

var app = express();
const publicPath = path.join(__dirname, '../public');

var port = process.env.PORT || 3000;

app.use(express.static(publicPath));


// console.log(__dirname + '/../public');//Old way
// console.log(publicPath);//New way

app.listen(port, () => {
    console.log(`Server running on Port ${port} `);
});

