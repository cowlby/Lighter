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
    	for (var i = 0; i < wicks.length; i++) {
			className = wicks[i].type ? fuel.aliases[wicks[i].type] || wicks[i].type : '';
			innerHtml += '<span class="' + className + '">' + wicks[i].text + '</span>';
		}
		
		return new Element(this.options.containerTag, {
			'html': innerHtml
		});
    }
});
