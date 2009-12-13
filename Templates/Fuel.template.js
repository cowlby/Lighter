/**
 * Script:
 *   Fuel.template.js - Template to build custom Fuel for Lighter.js.
 *
 * License:
 *   MIT-style license.
 * 
 * Author:
 *   Jose Prado
 *
 * Copyright:
 *   Copyright (©) 2009 [Jose Prado](http://pradador.com/).
 *
 */
Fuel.myFuel = new Class ({
	
	Extends: Fuel,
	language: '',
	
	initialize: function(lighter, options) {
		
		/** Set of keywords in CSV form. Add multiple keyword hashes for differentiate keyword sets. */
		this.keywords = new Hash({
			/*keywords: {
				csv: "keyword1, keyword2, keyword3",
				alias: 'kw0'
			},*/
		}),
		
		/** Set of RegEx patterns to match */
		this.patterns = new Hash({
			//'slashComments': {pattern: this.common.slashComments, alias: 'co0'},
		});
		
		/** Script Delimiters. Remove or set to null if not applicable. */
		this.delimiters = new Hash({
			start: this.strictRegExp('startTag1', 'startTag2'),
			end: this.strictRegExp('endTag1')
		});
		
		// Call parent constructor AFTER instance variables are set.
		this.parent(lighter, options);
	}
	
});
