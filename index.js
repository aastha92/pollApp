const express = require('express');
const bodyParser = require("body-parser");
const usersRouter = require('./routers/users');
const pollsRouter = require('./routers/polls');
const optionsRouter = require('./routers/options');
const votesRouter = require('./routers/votes');

const app = express();
const port = process.env.PORT || 4001;

app.use(bodyParser.json())
app.use('/users', usersRouter)
app.use('/polls', pollsRouter)
app.use('/options', optionsRouter)
app.use('/votes', votesRouter)

app.get('/', (req, res) => {
  res.json('Poll App');
}) 

app.listen(port, () =>{
    console.log(`web server is listening on port ${port}!`);
})

