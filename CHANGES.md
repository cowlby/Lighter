### Version 2.0 ###

* Switched to Stylesheet based styles. As powerful as the dynamically generated styles are, stylesheets are just too simple to pass up.
* Added "inline" option to mode so that output is wrapped in a CODE element. Useful for single line code like bash commands.
* Added Markdown, Shell and SQL Fuel.
* Added Espresso inspired theme Tutti.
* Removed circular dependencies so that Fuel works together with Lighter but isn't dependent on it.
* Fixed bug where Fuel rules object was being reused across fuels. Was causing a race condition with different results each time.
* Fixed incorrectly labeled single line string rules and added multi-line string rules.

### Version 1.5.1 ###

* Fixed path finding bug where scripts with query strings would break the search.

### Version 1.5 ###

* Elements to be highlighted can now have more than one class. Lighter.js will simply use the first class as the fuel:flame combo.
* Path is determined automatically based on the include path of Lighter.js. Can still be set via options if needed.
* Better dynamic loading of Fuel/Flame scripts if they aren't already included in the page with Try/Catch blocks.
* Flat repository for easy deployment via SVN. Ready to use by simply linking to the Lighter.js file.
* Flame.js creates only one style element and injects all rules into that container.
* Flame.js optimized by creating the full styles string and then injecting into the head of the document once rather than once per rules.
* Basic "copy to clipboard" functionality added via the "clipboard" option. You provide the DOM element for now, Lighter.js will take care of attaching the necessary code and events.

### Version 1.0 ###

* Initial Release