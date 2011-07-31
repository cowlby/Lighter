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
	    
		// Step through each match and add unmatched + matched bits to el.
		Object.each(wicks, function(wick) {
			el.appendText(code.substring(pointer, wick.index));
			this.insertAndKeepEl(el, wick.text, wick.type);
			pointer = wick.end;
		}, this);
	
		// Add last unmatched code segment if it exists.
		if (pointer < code.length) {
			el.appendText(code.substring(pointer, code.length));
		}
		
		return el;
    }
});
