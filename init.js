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
     *  jQuery
     *  AMD loader like require.js or common.js
    */

    
    //  AMD CONFIG ############################################################
    //  Set module keywords and paths for require.js
    require.config({
        paths: {
            //  Scripts from third party vendors
            //  Ommit the file extention
            "script_shortname-01": "path/filename",
            "script_shortname-02": "path/filename"
        }
    });
    
    
    //  LAZYLOADING CONSTRUCTOR AND METHOD ####################################
    //  Lazyload constructor
    function lazyObject(elem, amd, func){
        this.elem = elem;
        this.amd = amd;
        this.func = func;
    }
    
    //  Lazyload function
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
    //  Declare method instance
    lazyObject.prototype.lazyLoad = lazyLoad;
    
    //  Function to invoke lazy loading
    function loadLazyScripts(){
        //  Iterate through the objects in the lazyArray 
        for(n in lazyArray){
            //  Check if the current object returns any DOM elements from the jQuery selector
            if(lazyArray[n].elem.length>0){
                //  Load the current object values in to a new Lazyload object using the lazyObject construtor
                var lazyObj = new lazyObject(lazyArray[n].elem, lazyArray[n].amd, lazyArray[n].func);
                //  Invoke lazyLoad method with the new object 
                lazyObj.lazyLoad();
            }
        }
    }
    
    
    //  LAZY LOADING CONFIG ####################################################
        
    /*  Loading DOM elements into an array of objects that will initiate lazy loading
    
     *  elem: The jQuery selector that triggers the lazy load and gets passed to 'func'
     *  amd:  Asyncronous Script Modules (AMD) that need to load (see the require.config above)
     *  func: The function to execute (mostly found in fep-functions.js)od
     */
    require(['jquery'],function() { 
    
        var lazyArray = [
    
            {   elem: $("#selector01"),
                amd:  ['script_shortname-01'], 
                func: 'functionName01' },
    
            {   elem: $('#selector02'),
                amd:  ['script_shortname-01','script_shortname-02'], 
                func: 'functionName02' }
        ];


        
        
        //  jQUERY DOMREADY ####################################################
        
        $(document).ready(function(){
            
            // Start lazyloading!       
            loadLazyScripts();

        });
    
    });
