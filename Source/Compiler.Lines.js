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
    
    initialize: function(fuel, options)
    {
        this.parent(fuel, options);
    },
    
    _compile: function(wicks, code)
    {
        var el = new Element(this.options.containerTag.parent),
	        newLine = new Element(this.options.linesTag.parent),
    	    lineNum = 1,
    	    pointer = 0,
    	    text    = null,
    	    containerTag = this.options.containerTag,
    	    linesTag     = this.options.linesTag;

    	// Small hack to ensure tables have no ugly styles.
    	if (parent[0] == "table") {
    	    el.set("cellpadding", 0).set("cellspacing", 0).set("border", 0);
    	}

    	// If lines need to be wrapped in an inner parent, create that element
    	// with this test. (E.g, tbody in a table)
    	if (containerTag.child !== null) {
    	    el = new Element(containerTag.child).inject(el);
    	}

    	// If code needs to be wrapped in an inner child, create that element
    	// with this test. (E.g, tr to contain td)
    	if (linesTag.child !== null) {
    	    newLine = new Element(linesTag.child).inject(newLine);
    	}
    	
    	newLine.addClass(this.flame + 'line');
    	
    	if (this.options.lineNumber) {
    	    lineNum = this.insertLineNum(newLine, lineNum);
    	}

    	// Step through each match and add matched/unmatched bits to lighter.
    	Object.each(wicks, function(match) {

    		// Create and insert un-matched source code bits.
    		if (pointer != match.index) {
    			text = code.substring(pointer, match.index).split("\n");
    			for (var i = 0; i < text.length; i++) {
    				if (i < text.length - 1) {
    					if (text[i] === '') {
    					    text[i] = ' ';
    					}
    					newLine = this.insertAndMakeEl(newLine, el, text[i]);
    					if (this.options.lineNumbers) {
    					    lineNum = this.insertLineNum(newLine, lineNum);
    					}
    				} else {
    					this.insertAndKeepEl(newLine, text[i]);
    				}
    			}
    		}
	
    		// Create and insert matched symbol.
    		text = match.text.split('\n');
    		for (var i = 0; i < text.length; i++) {
    			if (i < text.length - 1) {
    				newLine = this.insertAndMakeEl(newLine, el, text[i], match.type);
    				if (this.options.lineNumbers) {
    				    lineNum = this.insertLineNum(newLine, lineNum);
    				}
    			} else {
    				this.insertAndKeepEl(newLine, text[i], match.type);
    			}
    		}
    		
    		pointer = match.end;
    	}, this);

    	// Add last unmatched code segment if it exists.
    	if (pointer <= code.length) {
    		text = code.substring(pointer, code.length).split('\n');
    		for (var i = 0; i < text.length; i++) {
    			newLine = this.insertAndMakeEl(newLine, el, text[i]);
    			if (this.options.lineNumbers) {
    			    lineNum = this.insertLineNum(newLine, lineNum);
    			}
    		}
    	}

    	// Add alternate line styles based on pseudo-selector.
    	if (this.options.altLines !== null) {
    		if (this.options.altLines == 'hover') {
    			el.getElements(containerTag.child || containerTag.parent).addEvents({
    					'mouseover': function() { this.toggleClass('alt'); },
    					'mouseout':  function() { this.toggleClass('alt'); }
    			});
    		} else {
    			if (linesTag.child !== null) {
    				el.getChildren(':'+this.options.altLines).getElement('.'+this.flame+'line').addClass('alt');
    			} else {
    				el.getChildren(':'+this.options.altLines).addClass('alt');
    			}
    		}
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
