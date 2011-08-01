/*
---
description: Compiles an array of Wicks into an Element.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: '*'

provides: [Compiler]

...
*/
(function(){

var Compiler = this.Compiler = new Class({
    
    Implements: Options,
    
    options: {},
    
    initialize: function(options)
    {
        this.setOptions(options);
    },
    
    compile: function(fuel, flame, wicks)
    {
        var el = this._compile(fuel, flame, wicks);
        
	    // Set class and id attributes.
        el.set('class', flame + 'Lighter');
        el.set('id', 'Lighter_' + Date.now());
        
        return el;
    },
    
    _compile: function(fuel, flame, wicks)
    {
        throw new Error('Extending classes must override the _compile method.');
    }
});

})();
