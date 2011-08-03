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
    	var innerHtml = '',
    	    className = '';
		
		// Step through each match and add wicks as text to the innerHtml.
		wicks.each(function(wick) {
			className = wick.type ? fuel.aliases[wick.type] || wick.type : '';
			innerHtml += '<span class="' + className + '">' + wick.text + '</span>';
		}, this);
		
		return new Element(this.options.containerTag, {
			'html': innerHtml
		});
    }
});
