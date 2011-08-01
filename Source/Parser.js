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
    
    /**
     * @constructs
     * @param {Fuel} fuel The fuel to use for parsing.
     */
    initialize: function(fuel)
    {
        this.fuel = fuel;
    },
    
    /**
     * Parses source code using fuel regex rules and returns the array of
     * matches.
     *
     * @param {String} code     The source code to parse.
     * @param {Number} [offset] Optional offset to add to the found index.
     * @todo Add the non-matched code as tokens.
     */
    parse: function(code, offset)
    {
        var wicks = this._parse(code, offset);
        
        return wicks;
    },
    
    /**
     * Parsing strategy method which child classes must override.
     */
    _parse: function(code, offset)
    {
        throw new Error('Extending classes must override the _parse method.');
    }
});

})();
