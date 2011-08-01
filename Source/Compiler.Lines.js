/*
---
description: Compiles an array of Wicks into an Element.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: '*'

provides: [Compiler.Lines]

...
*/
Compiler.Lines = new Class({
    
    Extends: Compiler,
    
    options: {
        altLines: null,
        containerTag: {
            parent: 'ol',
            child:  null
        },
        linesTag: {
            parent: 'li',
            child:  null
        },
        lineNumbers: false,
        numbersTag:  null
    },
    
    initialize: function(fuel, flame, options)
    {
        this.parent(fuel, flame, options);
    },
    
    _compile: function(wicks)
    {
        var el           = new Element(this.options.containerTag.parent),
	        newLine      = null,
    	    lineNum      = 1,
    	    lines        = null,
    	    containerTag = this.options.containerTag,
    	    linesTag     = this.options.linesTag;

    	// If lines need to be wrapped in an inner parent, create that element
    	// with this test. (E.g, tbody in a table)
    	if (containerTag.child !== null) {
    	    el = new Element(containerTag.child).inject(el);
    	}
    	
    	// Create a new line and insert the line number if necessary.
    	newLine = this.createNewLine(el);
    	if (this.options.lineNumbers) {
    	    lineNum = this.insertLineNum(newLine, lineNum);
    	}

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
    				newLine = this.createNewLine(el);
    				if (this.options.lineNumbers) {
    				    lineNum = this.insertLineNum(newLine, lineNum);
    				}
    			}
    		}
    	}, this);

    	// Add alternate line styles based on pseudo-selector.
    	switch (this.options.altLines) {
    	    case null:
    	        break;
    	        
    	    case 'hover':
    	        el.getElements(containerTag.child || containerTag.parent).addEvents({
    					'mouseover': function() { this.toggleClass('alt'); },
    					'mouseout':  function() { this.toggleClass('alt'); }
    			});
    			break;
    			
    	    default:
    	        if (linesTag.child !== null) {
    				el.getChildren(':'+this.options.altLines)
    				    .getElement('.'+this.flame+'line')
    				    .addClass('alt');
    			} else {
    				el.getChildren(':'+this.options.altLines).
    				    addClass('alt');
    			}
    			break;
    	}

    	// Add first/last line classes to correct element based on mode.
    	if (linesTag.child !== null) {
    		el.getFirst().getChildren().addClass(this.flame + 'first');
    		el.getLast().getChildren().addClass(this.flame + 'last');
    	} else {
    		el.getFirst().addClass(this.flame + 'first');
    		el.getLast().addClass(this.flame + 'last');
    	}

    	// Ensure we return the real parent, not just an inner element like a tbody.
    	if (containerTag.child) {
    	    el = el.getParent();
    	}
    	
    	return el;
    },
    
    createNewLine: function(container)
    {
		var newLine = new Element(this.options.linesTag.parent);
		newLine.inject(container);
		
		if (this.options.linesTag.child !== null) {
		    newLine = new Element(this.options.linesTag.child).inject(newLine);
		}
		
		newLine.addClass(this.flame + 'line');
		
		return newLine;
    },

	/**
	 * Helper funciton to insert line number into line.
	 */
	insertLineNum: function(el, lineNum)
	{
		var newNum = new Element(this.options.numbersTag, {
			'text':  lineNum,
			'class': this.flame + 'num'
		}).inject(el.getParent(), 'top');

		return lineNum + 1;
	}
});
