var express = require('express'), cors = require('cors'),
  app = express(),  
  port = process.env.PORT || 80;

  app.use(cors());

  var routes = require('./api/routes/routes');
  routes(app);

app.listen(port);
