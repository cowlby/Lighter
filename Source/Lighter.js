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
		altLines: null,
		compiler: null,
		editable: false,
		fuel:     'standard',
		flame:    'standard',
		indent:   -1,
		loader:   null,
		parser:   null
	},

	initialize: function(options)
	{
		this.setOptions(options);
	},
	
	light: function (codeblock, container)
	{
		var codeblock = document.id(codeblock),
			container = document.id(container),
			code      = this.getCode(codeblock),
			ff        = this.parseClass(codeblock.get('class')),
			fuel      = ff.fuel  || this.options.fuel,
			flame     = ff.flame || this.options.flame;

		// Load fuel/flame to start chain of loads.
		this.options.loader.loadFlame(flame);
		this.options.loader.loadFuel(fuel, function() {
			
			fuel = new Fuel[fuel]();
			
			var wicks   = this.options.parser.parse(fuel, code),
			    lighter = this.options.compiler.compile(fuel, flame, wicks);
			
			if (container) {
				container.empty();
				lighter.inject(container);
			} else {
				codeblock.setStyle('display', 'none');
				lighter.inject(codeblock, 'after');
			}
			
			if (this.options.editable) {
				lighter.set('contenteditable', 'true');
			}
			
		}.bind(this), function() {
			throw new Error('Could not load fuel ' + fuel + 'successfully.');
		}.bind(this));
		
		return this;
	},
	
	
	unlight: function(lighter)
	{
		throw new Error('Unlight is not yet implemented.');
	},
	
	getCode: function(codeblock)
	{
	    var code = codeblock.get('html')
	    	.replace(/(^\s*\n|\n\s*$)/gi, '')
	        .replace(/&lt;/gim, '<')
	        .replace(/&gt;/gim, '>')
	        .replace(/&amp;/gim, '&');
	
		// Indent code if user option is set.
		if (this.options.indent > -1) {
			code = code.replace(/\t/g, new Array(this.options.indent + 1).join(' '));
	    }
		
		return code;
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
	}
});

/**
 * Element Native extensions.
 */
Element.implement({
    light: function(options) {
        throw new Error('light is not fully implemented.');
    }
});

})();
