/*
---
description: Compiles an array of Wicks into an Element.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: '*'

provides: [Compiler]

...
*/
(function(){

var Compiler = this.Compiler = new Class({
    
    Implements: Options,
    
    options: {},
    
    initialize: function(fuel, flame, options)
    {
        this.setOptions(options);
        this.fuel  = fuel;
        this.flame = flame;
    	this.id    = 'Lighter_' + Date.now();
    },
    
    compile: function(wicks, code, className)
    {
        var el = this._compile(wicks, code);
        
	    // Set class and id attributes.
        el.set('class', this.flame + 'Lighter');
        el.set('id', this.id);
        
        return el;
    },
    
    _compile: function(wicks, code)
    {
        throw new Error('Extending classes must override the _compile method.');
    },

    /**
     * Helper function to insert new code segment into existing line.
     */
	insertAndKeepEl: function(el, text, alias)
	{
		if (text.length > 0) {
			var span = new Element('span', { 'text': text });
			if (alias) {
				span.addClass(this.fuel.aliases[alias] || alias);
			}
			span.inject(el);
		}
	},

    /**
     * Helper function to insert new code segment into existing line and create
     * new line.
     */
	insertAndMakeEl: function(el, group, text, alias)
	{
		this.insertAndKeepEl(el, text, alias);
		if (this.options.linesTag.child !== null) {
		    el = el.getParent();
		}
		el.inject(group);
		
		var newLine = new Element(this.options.linesTag.parent);
		if (this.options.linesTag.child !== null) {
		    newLine = new Element(this.options.linesTag.child).inject(newLine);
		}
		newLine.addClass(this.flame+'line');
		
		return newLine;
	}
});

})();
