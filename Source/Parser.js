/*
---
description: Code parsing engine for Lighter.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: '*'

provides: [Parser]

...
*/
(function(){

var Parser = this.Parser = new Class({
    
    initialize: function(fuel)
    {
        this.fuel = fuel;
    },
    
    parse: function(code, offset)
    {
        throw new Error('Extending classes must override the parse method.')
    }
});

})();
