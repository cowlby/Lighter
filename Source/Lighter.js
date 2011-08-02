/*
---
description: Builds and displays an element containing highlighted code bits.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: '*'

provides: [Lighter]

...
*/
(function() {

var Lighter = this.Lighter = new Class({	
	
	Implements: [Options],
	
	options: {
		altLines:  null,
		clipboard: null,
		container: null,
		editable:  false,
		flame:     'standard',
		fuel:      'standard',
		indent:    -1,
		matchType: 'standard',
		mode:      'pre',
		path:      null,
		strict:    false
	},

	initialize: function(options)
	{
		this.setOptions(options);
		
//		this.codeblock = document.id(codeblock);
//		this.container = document.id(this.options.container);
//		this.setCode(codeblock);
		
		// Extract fuel/flame names. Precedence: className > options > 'standard'.
//		var ff    = this.parseClass(this.codeblock.get('class')),
//		    fuel  = ff.fuel || this.options.fuel,
//		    flame = ff.flame || this.options.flame;
		
		// Create the parser and compiler objects from the options passed in.
		this.loader   = new Loader();
		this.parser   = this.parserFactory(this.options.matchType);
		this.compiler = this.compilerFactory(this.options.mode, this.options.altLines);
	
		// Load fuel/flame to start chain of loads.
		this.loadFlame(this.options.flame);
		this.loadFuel(this.options.fuel);
	},
	
	setCode: function(codeblock)
	{
	    this.code = chop(this.codeblock.get('html'))
	        .replace(/&lt;/gim, '<')
	        .replace(/&gt;/gim, '>')
	        .replace(/&amp;/gim, '&');
	
		// Indent code if user option is set.
		if (this.options.indent > -1) {
	        this.code = tabToSpaces(this.code, this.options.indent);
	    }
	},
	
	parseClass: function(className)
	{
		var classNames = className.split(' ');
		
		switch (classNames.length) {
			case 0: // No language! Simply wrap in Lighter.js standard Fuel/Flame.
				break;
				
			case 1: // Single class, assume this is the fuel/flame
				ff = classNames[0].split(':');
				break;
				
			default: // More than one class, let's give the first one priority for now.
				ff = classNames[0].split(':');
				break;
		}
		
		return {
			fuel:  ff[0],
			flame: ff[1]
		};
	},
	
	compilerFactory: function(mode, altLines)
	{
		var compiler = null;
		
		switch (mode) {
			case 'inline':
				compiler = new Compiler.Inline({ containerTag: 'code' });
				break;
				
			case 'pre':
				compiler = new Compiler.Inline({ containerTag: 'pre' });
				break;
				
			case 'ol':
				compiler = new Compiler.List({ altLines: altLines });
				break;
				
			case 'div':
				compiler = new Compiler.Lines({ altLines: altLines });
				break;
				
			case 'table':
				compiler = new Compiler.Lines({
			        altLines:     altLines,
			        containerTag: { parent: 'table', child:  'tbody' },
			        linesTag:     { parent: 'tr', child:  'td' },
			        numbersTag:   'td'
			    });
				break;
				
			default:
				throw new Error('Unknown mode specified.');
				break;
		}
		
		return compiler;
	},
	
	parserFactory: function(type)
	{
		var parser = null;
		
		switch (type) {
			case 'standard':
				parser = new Parser.Strict();
				break;
				
			case 'lazy':
				parser = new Parser.Lazy();
				break;
				
			default:
				throw new Error('Unknown matchType specified.');
		}
		
		return parser;
	},
	
	loadFlame: function(flame)
	{
	    return this.loader.loadFlame(flame);
	},
	
	loadFuel: function(fuel)
	{
		if (typeof(Fuel[fuel]) != 'function' && typeof(Fuel[fuel].prototype) != 'object') {
			this.loader.loadFuel(fuel, this.loadFuel.pass([fuel], this), function() {
				this.loadFuel('standard');
			}.bind(this));
			return;
		}
		
		this.fuel = new Fuel[fuel]();
		this.parser.setFuel(this.fuel);
		//this.light();
	},
	
//	light: function()
//	{
//		// Build highlighted code object.
//		this.element = this.toElement();
//	
//		// Insert lighter in the right spot.
//		if (this.container) {
//			this.container.empty();
//			this.element.inject(this.container);
//		} else {
//			this.codeblock.setStyle('display', 'none');
//			this.element.inject(this.codeblock, 'after');
//			if (this.options.clipboard) {
//			    this.loadClipboard();
//			}
//		}
//	},
//	
//	unlight: function()
//	{
//		document.id(this).setStyle('display', 'none');
//		this.codeblock.setStyle('display', 'inherit');
//	},
	
	loadClipboard: function()
	{
		try {
			var clip = new ZeroClipboard.Client();
			clip.setPath(this.options.path);
			clip.glue($(this.options.clipboard));
			clip.setText(this.code);
			clip.addEventListener('complete', function(client, text) {
	        alert("Copied text to clipboard:\n" + text);
	    });
		} catch (e) {
			this.loadScript('clipboard', 'ZeroClipboard.js', {
				'load': this.loadClipboard.bind(this),
				'error': function(){}
			});
			return false;
		}
	},

	/* ----------------------------------- */
	/* ------>>> toType METHODS <<<------- */
	/* ----------------------------------- */
//	toElement: function()
//	{
//		if (!this.element) {
//			this.element = this.builder[this.options.mode]();
//			if (this.options.editable) { this.element.set('contenteditable', 'true'); }
//		}
//	
//		return this.element;
//	},
	
	toString: function()
	{
		return this.code;
	}
});

/**
 * Element Native extensions.
 */
//Element.implement({
//    light: function(options) {
//        return new Lighter(this, options);
//    }
//});

/**
 * String functions.
 */
function chop(str) {
    return str.replace(/(^\s*\n|\n\s*$)/gi, '');
};

function tabToSpaces(str, spaces) {
    return str.replace(/\t/g, new Array(spaces + 1).join(' '));
};

})();
