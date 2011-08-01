/*
---
description: Compiles an array of Wicks into an Element.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: '*'

provides: [Compiler.Inline]

...
*/
Compiler.Inline = new Class({
    
    Extends: Compiler,
    
    options: {
        containerTag: 'pre'
    },
    
    initialize: function(fuel, flame, options)
    {
        this.parent(fuel, flame, options);
    },
    
    _compile: function(wicks)
    {
		var el = new Element(this.options.containerTag);
	    
		// Step through each match and add wicks to the element.
		wicks.each(function(wick) {
			el.grab(new Element('span', {
				'text':  wick.text,
				'class': wick.type ? this.fuel.aliases[wick.type] || wick.type : ''
			}));
		}, this);
		
		return el;
    }
});
