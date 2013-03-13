lazyJavaScripts
===============

This is a solution for loading and executing scripts based on elements found in the DOM.

For example: If a page has an input element with the classname ‘date’ the script fiels for the date picker will be loaded. 
When the scripts for date picker are loaded the function to attach a datepicker to the corrosponding element will be invoked.

### Cofig

    {   // Attach a jQuery UI datepicker
        elem: $('.date'),                       /* jQuery Selector */
        amd:  ['jqueryui','customScriptFile'],  /* The script files for the datepicker */
        func: 'attachDatepicker'                /* The function in customScriptFile.js to 
                                                   attach the datepicker to “$('.date')“ */
    }


