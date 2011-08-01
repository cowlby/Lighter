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
    
    initialize: function(fuel, flame, options)
    {
        this.setOptions(options);
        this.fuel  = fuel;
        this.flame = flame;
    	this.id    = 'Lighter_' + Date.now();
    },
    
    compile: function(wicks)
    {
        var el = this._compile(wicks);
        
	    // Set class and id attributes.
        el.set('class', this.flame + 'Lighter');
        el.set('id', this.id);
        
        return el;
    },
    
    _compile: function(wicks)
    {
        throw new Error('Extending classes must override the _compile method.');
    }
});

})();
