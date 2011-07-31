/*
---
description: Default fuel.

license: MIT-style

authors:
- Jose Prado

requires:
  core/1.2.4: '*'

provides: [Fuel.standard]

...
*/
Fuel.standard = new Class({
    
    Extends: Fuel,
    
    initialize: function(options)
    {
        this.parent(options);
    }
});
