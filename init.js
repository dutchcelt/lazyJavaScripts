/*! ###########################################################################
    
    Source: https://github.com/dutchcelt/lazyJavaScripts
    
    Copyright (C) 2013,  Lunatech Labs B.V., C. Egor Kloos. All rights reserved.
    GNU General Public License, version 3 (GPL-3.0)
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see http://www.opensource.org/licenses/gpl-3.0.html
    
    ########################################################################### */

    /*  Requirements:
     *  
     *  AMD loader like require.js or curl.js
     *  jQuery or Zepto (If using zepto replace the jquery module reference with a zepto one)
    */

    
    //  AMD CONFIG ############################################################
    //  Set module keywords and paths for require.js
    require.config({
        paths: {
            //  Scripts from third party vendors
            //  Ommit the file extention
            "script_shortname-01":  "path/filename",
            "script_shortname-02":  "path/filename"
            "jquery":               "http://code.jquery.com/jquery-1.9.1.min"
            "ga":                   "http://www.google-analytics.com/ga"
        }
    });
    
    
    //  LAZY LOADING ###########################################################

    
    //  Lazyload method
    function lazyLoad(){
        var elem = this.elem;
        var func = this.func;
        require(this.amd, function(){ 
            if (func) {
                // Assign the global function reference to a variable
                var fn = window[func];
                // Use the variable to invoke the function
                if(typeof fn === 'function') {
                    fn(elem);
                }
            }
        });
    }
    
    //  Initiate lazyloading per object  
    function loadLazyScripts(array){
        
        var loaders = array.concat(); // Leave the original array intact
        
        // Prevent large arrays from blocking the UI 
        setTimeout(function(){
        
            var loader = loaders.shift();
            
            //  Check for the presense of a DOM element and invoke 
            //  the lazyLoad method with the current object ‘loader’
            if(loader.elem.length>0){
                lazyLoad.call(loader);
            }
            
            //  Iterate through the objects in the array 
            if (loaders.length > 0){
                setTimeout(arguments.callee, 0);
            }
            
        }, 0);
    }
    
            
    /*  CONFIG: Loading DOM elements into an array of objects that will initiate lazy loading
    
     *  elem:   The DOM element or jQuery selector that triggers the lazy load and gets passed to 'func'
     *  amd:    Asyncronous Script Modules (AMD) that need to load (see the require.config above)
     *  func:   The function to execute. Only one function per object.
                Use false if no external function is needed (see Google Analytics example).
     */
    require(['jquery'],function() { 
    
        //  LAZYLOAD CONFIG ####################################################
        
        var lazyArray = [
        
            {   // Google Analytics example
                elem: $("body"),
                amd:  ['ga'], 
                func: false }, // Has no external function

            {   // Will Load a single script file
                elem: $("#selector01"),
                amd:  ['script_shortname-01'], 
                func: 'functionName01' },
    
            {   // Will Load multiple script files
                elem: $('#selector02'),
                amd:  ['script_shortname-01','script_shortname-02'], 
                func: 'functionName02' }
        ];
        
        
        //  jQUERY DOMREADY ####################################################
        
        $(document).ready(function(){
            
            // Start lazyloading!       
            loadLazyScripts(lazyArray);

        });
    
    });
    
