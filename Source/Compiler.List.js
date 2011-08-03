/*
---
description: Compiles an array of Wicks into an OL Element.

license: MIT-style

authors:
- Jose Prado

requires:
- core/1.3: '*'
- Compiler

provides: [Compiler.List]
...
*/
Compiler.List = new Class({
    
    Extends: Compiler,
    
    options: {
        altLines: null,
        containerTag: 'ol'
    },
    
    initialize: function(options)
    {
        this.parent(options);
    },
    
    _compile: function(fuel, flame, wicks)
    {
        var el        = new Element(this.options.containerTag),
            innerHtml = '<li class="' + flame + 'line ' + flame + 'first">',
            newHtml   = '',
            className = '',
            lines     = null;
        
    	// Step through each match and add wicks to the Element by breaking
    	// them up into individual lines.
        for (var i = 0; i < wicks.length; i++) {
    		lines = wicks[i].text.split('\n');
    		for (var j = 0; j < lines.length; j++) {
    			
    			if (lines[j].length > 0) {
	    			className = wicks[i].type ? fuel.aliases[wicks[i].type] || wicks[i].type : '';
	    			innerHtml += '<span class="' + className + '">' + lines[j] + '</span>';
    			}

    			if (j < lines.length - 1) {
    				className = flame + 'line';
    				innerHtml += '</li><li class="' + className + '">';
    			}
    		}
    	}
    	
    	innerHtml += '</li>';
    	el.set('html', innerHtml);

    	// Add last line classes to correct element.
    	el.getLast().addClass(flame + 'last');
    	

    	// Add alternate line styles based on pseudo-selector.
    	switch (this.options.altLines) {
    	    case null:
    	        break;
    	        
    	    case 'hover':
    	        el.getElements('li').addEvents({
    				'mouseover': function() { this.toggleClass('alt'); },
    				'mouseout':  function() { this.toggleClass('alt'); }
    			});
    			break;
    			
    	    default:
				el.getChildren(':' + this.options.altLines).addClass('alt');
    			break;
    	}
    	
    	return el;
    }
});
