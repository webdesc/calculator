;(function() {

  'use strict';

  require('../css/style.css');

  let plainCalcTemplate = require('jade!../templates/plain-calc.jade');

  let Calc = require('./calc');

  new Calc({
    template: plainCalcTemplate
  });

})();