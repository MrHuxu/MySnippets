var path = require('path');
var express = require('express');
var app = express();

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.render('./index.html');
});

app.listen(3000, () => console.log('App is running on port 3000'));