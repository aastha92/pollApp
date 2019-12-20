const express = require('express');
const bodyParser = require("body-parser");
const usersRouter = require('./routers/users');

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json())
app.use('/users', usersRouter)

app.get('/', (req, res) => {
  res.json('Poll App');
}) 

app.listen(port, () =>{
    console.log(`web server is listening on port ${port}!`);
})

