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
     * tokens.
     *
     * @param {String} code     The source code to parse.
     * @param {Number} [offset] Optional offset to add to the found index.
     */
    parse: function(code, offset)
    {
        var wicks = this._parse(code, offset),
            text  = null,
            wick  = null;
        
        for (var i = 0, pointer = 0; i < wicks.length; i++) {
            if (pointer < wicks[i].index) {
                text = code.substring(pointer, wicks[i].index)
                wick = new Wick(text, 'unknown', pointer);
                wicks.splice(i, 0, wick);
            }
            pointer = wicks[i].end;
        }
        
        if (pointer < code.length) {
            text = code.substring(pointer, code.length);
            wick = new Wick(text, 'unknown', pointer);
            wicks.push(wick);
        }
        
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
