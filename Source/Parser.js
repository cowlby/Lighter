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
     */
    initialize: function()
    {
    },
    
    /**
     * Parses source code using fuel regex rules and returns the array of
     * tokens.
     *
     * @param {Fuel} fuel       The Fuel to use for parsing.
     * @param {String} code     The source code to parse.
     * @param {Number} [offset] Optional offset to add to the found index.
     */
    parse: function(fuel, code, offset)
    {
        var wicks = this._parse(fuel, code, offset),
            text  = null,
            wick  = null;
        
        // Add code between matches as an unknown wick to the wick array.
        for (var i = 0, pointer = 0; i < wicks.length; i++) {
            if (pointer < wicks[i].index) {
                text = code.substring(pointer, wicks[i].index)
                wick = new Wick(text, 'unknown', pointer);
                wicks.splice(i, 0, wick);
            }
            pointer = wicks[i].end;
        }
        
        // Add the final unmatched piece if it exists.
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
    _parse: function(fuel, code, offset)
    {
        throw new Error('Extending classes must override the _parse method.');
    }
});

})();
