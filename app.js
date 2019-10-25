var express = require('express'),
  app = express(),  
  port = 3000;

  var routes = require('./api/routes/routes');
  routes(app);

app.listen(port);
