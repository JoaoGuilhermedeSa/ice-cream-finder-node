module.exports = function(app) {
    var iceCreamController = require('../controllers/IceCreamController');
  
    app.route('/api/ice-cream').get(iceCreamController.list_ice_cream_places);
  
  };