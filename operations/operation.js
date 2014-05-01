var classify = require('classify-js');

var operationTypes = {
  'insert'        : true,
  'delete'        : true,
  'identity'      : true,
  'incrementState': true
};

var Operation = classify({
  name : "Operation",
  initialize : function(options) {
    this._targetId = options.targetId || null;
    this._type = options.type || null;
    this._context = options.context || 0; // How many ops had occurred when this was created
  },
  classMethods : {
    assertValidType : function(type) {
      if (!operationTypes[type]) {
        throw new Error("Operation type " + type + " is not valid.");
      }
    }
  },
  instanceMethods : {
    getType : function() {
      return this._type;
    },
    setType : function(type) {
      Operation.assertValidType(type);
      this._type = type;
    },
    isInsert : function() {
      return this._type === 'insert';
    },
    isDelete : function() {
      return this._type === 'delete';
    },
    isIdentity : function() {
      return this._type === 'identity';
    },
    isIncrementState : function() {
      return this._type ==='incrementState';
    },
    evolve : function(operation) {
      if (operation.isInsert()) {
        return this.evolveByInsert(operation);
      }
      if (operation.isDelete()) {
        return this.evolveByDelete(operation);
      }
      if (operation.isIncrementState()) {
        return this.evolveByIncrementState(operation);
      }

      // Operation is identity.
      return this;
    }
  }
});

module.exports = Operation;
