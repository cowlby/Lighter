/*
---
description: Compiles an array of Wicks into an Element.

license: MIT-style

authors:
- Jose Prado

requires:
- core/1.3: '*'
- Compiler

provides: [Compiler.Inline]
...
*/
Compiler.Inline = new Class({
    
    Extends: Compiler,
    
    options: {
        containerTag: 'pre'
    },
    
    initialize: function(options)
    {
        this.parent(options);
    },
    
    _compile: function(fuel, flame, wicks)
    {
		var el = new Element(this.options.containerTag);
	    
		// Step through each match and add wicks to the element.
		wicks.each(function(wick) {
			el.grab(new Element('span', {
				'text':  wick.text,
				'class': wick.type ? fuel.aliases[wick.type] || wick.type : ''
			}));
		}, this);
		
		return el;
    }
});
