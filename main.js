const express = require('express')
const template = require('./lib/template.js');
const fs = require('fs');
const bodyParser = require('body-parser')
const compression = require('compression')
const indexRouter = require("./routes/index");
const topicRouter = require("./routes/topic");
const app = express()
const port = 3000
const helmet = require('helmet')
app.use(helmet())

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', (req, res, next) => {
  fs.readdir('./data', function (error, filelist) {
    req.list = filelist;
    next();
  });

});

app.use("/", indexRouter);
app.use('/topic', topicRouter);

app.use(function (req, res) {
  res.status(400).send("Sorry cant find that!");
});

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

