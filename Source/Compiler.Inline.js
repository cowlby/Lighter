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
    
    initialize: function(fuel, options)
    {
        this.parent(fuel, options);
    },
    
    _compile: function(wicks, code)
    {
		var el = new Element(this.options.containerTag),
		    pointer = 0;
	    
		// Step through each match and add wicks to the element.
		Object.each(wicks, function(wick) {
			el.appendText(code.substring(pointer, wick.index));
			this.insertAndKeepEl(el, wick.text, wick.type);
			pointer = wick.end;
		}, this);
		
		return el;
    }
});
