/*
---
description: File loading engine for Lighter.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: '*'

provides: [Loader]

...
*/
(function() {
    
var Loader = this.Loader = new Class({
    
    Implements: Options,
    
    options: {
        flames: null,
        fuels:  null
    },
    
    initialize: function(options)
    {
        this.setOptions(options);
        this.flames = {};
        this.fuels  = {};
        
        $$('head script').each(function(el) {
            var script = el.src.split('?', 1),
                pattern = /Loader\.js$/gi;
            if (pattern.test(script[0])) {
                this.basePath = script[0].replace(pattern, '');
            }
        }, this);
        
        if (this.options.flames === null) {
            this.options.flames = this.basePath;
        }
        
        if (this.options.fuels === null) {
            this.options.fuels = this.basePath;
        }
    },
    
    loadFlame: function(flame)
    {
        if (this.flames[flame] !== null) {
            this.flames[flame] = new Element('link', {
                rel:   'stylesheet',
                type:  'text/css',
                media: 'screen',
                href:  this.options.flames + 'Flame.' + flame + '.css?' + Date.now()
            }).inject(document.head);
        }
    },
    
    loadFuel: function(fuel, onLoad, onError)
    {
        onLoad  = onLoad  || function(){};
        onError = onError || function(){};
        
        var script = this.fuels[fuel] !== undefined ? this.fuels[fuel] : new Element('script', {
            src:  this.options.fuels + 'Fuel.' + fuel + '.js?' + Date.now(),
			type: 'text/javascript'
        });
        
        script.addEvents({
            load:  onLoad,
            error: onError,
            readystatechange: function() {
				if (['loaded', 'complete'].contains(this.readyState)) {
				    onLoad();
			    }
			}
        });
        
        if (this.fuels[fuel] == undefined) {
            this.fuels[fuel] = script.inject(document.head);
        }
    }
});

})();
