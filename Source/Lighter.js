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
		altLines: '', // Pseudo-selector enabled.
		clipboard: null,
		container: null,
		editable: false,
		flame: 'standard',
		fuel:  'standard',
		indent: -1,
		matchType: "standard",
		mode: "pre",
		path: null,
		strict: false
	},

	initialize: function(codeblock, options)
	{
		this.setOptions(options);
		
		this.codeblock = document.id(codeblock);
		this.container = document.id(this.options.container);
		this.setCode(codeblock);
		
		// Extract fuel/flame names. Precedence: className > options > 'standard'.
		this.getClass();
		
		// Set builder options.
		this.builder = {
			'inline': this.createLighter.pass('code', this),
			'pre':    this.createLighter.pass('pre', this),
			'ol':     this.createLighterWithLines.pass([['ol'], ['li']], this),
			'div':    this.createLighterWithLines.pass([['div'], ['div', 'span'], true, 'span'], this),
			'table':  this.createLighterWithLines.pass([['table', 'tbody'], ['tr', 'td'], true, 'td'], this)
		};
	
		// Load fuel/flame to start chain of loads.
		this.loader = new Loader();
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
	
	loadFlame: function(flame)
	{
	    return this.loader.load(flame);
	},
	
	loadFuel: function(fuel)
	{
		try {
			this.fuel = new Fuel[fuel]();
			this.light();
		} catch (e) {
			this.loader.loadFuel(fuel, this.loadFuel.bind(this), function() {
			    this.loadFuel('standard');
			}.bind(this));
		}
	},
	
	light: function()
	{
		// Build highlighted code object.
		this.element = this.toElement();
	
		// Insert lighter in the right spot.
		if (this.container) {
			this.container.empty();
			this.element.inject(this.container);
		} else {
			this.codeblock.setStyle('display', 'none');
			this.element.inject(this.codeblock, 'after');
			if (this.options.clipboard) {
			    this.loadClipboard();
			}
		}
	},
	
	unlight: function()
	{
		document.id(this).setStyle('display', 'none');
		this.codeblock.setStyle('display', 'inherit');
	},
	
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
				'error': $empty
			});
			return false;
		}
	},
	
	/* ----------------------------------- */
	/* ---->>> INIT HELPER METHODS <<<---- */
	/* ----------------------------------- */
	getClass: function()
	{
        var classNames = this.codeblock.get('class').split(' '),
            ff = [null, null];
        switch (classNames.length) {
            case 0: // No language! Simply wrap in Lighter.js standard Fuel/Flame.
				break;
			case 1: // Single class, assume this is the fuel/flame
				ff = classNames[0].split(':');
				break;
			default: // More than one class, let's give the first one priority for now.
				ff = classNames[0].split(':');
        }
        
        if (ff[0]) { this.options.fuel  = ff[0]; }
        if (ff[1]) { this.options.flame = ff[1]; }
	},

	/* ----------------------------------- */
	/* ------>>> toType METHODS <<<------- */
	/* ----------------------------------- */
	toElement: function()
	{
		if (!this.element) {
			this.element = this.builder[this.options.mode]();
			if (this.options.editable) { this.element.set('contenteditable', 'true'); }
		}
	
		return this.element;
	},
	
	toString: function()
	{
		return this.code;
	}
});

/**
 * Element Native extensions.
 */
Element.implement({
    light: function(options) {
        return new Lighter(this, options);
    }
});

/**
 * String functions.
 */
function chop(str) {
    return str.replace(/(^\s*\n|\n\s*$)/gi, '');
};

function tabToSpaces(str, spaces) {
    return str.replace(/\t/g, new Array(spaces + 1).join('d'));
};

})();
