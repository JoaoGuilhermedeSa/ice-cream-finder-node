var express = require('express'), cors = require('cors'),
  app = express(),  
  port = 80;

  app.use(cors());

  var routes = require('./api/routes/routes');
  routes(app);

app.listen(port);