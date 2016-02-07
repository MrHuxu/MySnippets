var path = require('path');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname));
app.use(express.static(path.join(__dirname, 'vendor')));

app.get('/', (req, res) => {
  res.render('./index.ejs');
});

const port = 15106;
app.listen(port, () => console.log('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port));