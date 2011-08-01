/*
---
description: Compiles an array of Wicks into an OL Element.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: '*'

provides: [Compiler.List]
...
*/
Compiler.List = new Class({
    
    Extends: Compiler,
    
    options: {
        altLines: null,
        containerTag: 'ol'
    },
    
    initialize: function(fuel, flame, options)
    {
        this.parent(fuel, flame, options);
    },
    
    _compile: function(wicks)
    {
        var el      = new Element(this.options.containerTag),
	        newLine = new Element('li', { 'class': this.flame + 'line' }).inject(el),
    	    lines   = null;

    	// Step through each match and add wicks to the Element by breaking
    	// them up into individual lines.
    	wicks.each(function(wick) {
    		
    		lines = wick.text.split('\n');
    		for (var i = 0; i < lines.length; i++) {
    			
    			if (lines[i].length > 0) {
	    			newLine.grab(new Element('span', {
						'text': lines[i],
						'class': wick.type ? this.fuel.aliases[wick.type] || wick.type : ''
					}));
    			}

    			if (i < lines.length - 1) {
    				newLine = new Element('li', { 'class': this.flame + 'line' }).inject(el);
    			}
    		}
    	}, this);
    	
    	console.log(this.options);

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

    	// Add first/last line classes to correct element based on mode.
    	el.getFirst().addClass(this.flame + 'first');
    	el.getLast().addClass(this.flame + 'last');
    	
    	return el;
    }
});
