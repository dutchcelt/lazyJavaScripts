lazyJavaScripts
===============

This is a solution for loading and executing scripts based on elements found in the DOM.

For example: If a page has an input element with the classname `date` the script files for the date picker will be loaded. 
When the scripts for date picker are loaded the function to attach a datepicker to the corrosponding element will be invoked.
Configuration of the loading (script files) and execution (functions) can be found in `$lazyLoadArray` and on domready we invoke `loadLazyScripts` with the config array. 

### Config example

    var $lazyLoadArray = [
    
        {   // Attach a jQuery UI datepicker
            elem: $('.date'),                       /* jQuery Selector */
            amd:  ['jqueryui','customScriptFile'],  /* The AMD references for the datepicker */
            func: 'attachDatepicker'                /* The function name in “customScriptFile.js” to 
                                                       attach the datepicker to “$('.date')“ */
        }
        
    ];
        
    
The reason for doing this is to simplify the management of varirous files and scripts into a single setup. 
The routing of JavaScript files is set by `require.config()`.


#### To do:

Move the scripts and arrays out of global scope.