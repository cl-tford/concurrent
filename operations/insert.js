var classify = require('classify-js');
var Operation = require('./operation');

var Insert = classify({
  name : 'Insert',
  initialize : function() {
    this.setType('insert');
  }
});
