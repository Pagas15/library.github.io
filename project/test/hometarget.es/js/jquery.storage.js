/*!
 * jquery.storage.js 0.0.3 - https://github.com/yckart/jquery.storage.js
 * The client-side storage for every browser, on any device.
 *
 * Copyright (c) 2012 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/02/10
 **/
;(function($, window, document) {
    'use strict';

    $.map(['localStorage', 'sessionStorage'], function( method ) {
        var defaults = {
            cookiePrefix : 'fallback:' + method + ':',
            cookieOptions : {
                path : '/',
                domain : document.domain,
                expires : ('localStorage' === method) ? { expires: 365 } : undefined
            }
        };

        try {
            $.support[method] = method in window && window[method] !== null;
        } catch (e) {
            $.support[method] = false;
        }

        $[method] = function(key, value) {
            var options = $.extend({}, defaults, $[method].options);

            this.getItem = function( key ) {
                var returns = function(key){
                    if($.support[method])
                    { 
                        try { 
                            return JSON.parse(window[method].getItem(key)) 
                        } 
                        catch(e){
                            JSON.parse($.cookie(options.cookiePrefix + key))
                        } 
                    }
                    else JSON.parse($.cookie(options.cookiePrefix + key));
                };
                if(typeof key === 'string') return returns(key);

                var arr = [],
                    i = key.length;
                while(i--) arr[i] = returns(key[i]);
                return arr;
            };

            this.setItem = function( key, value ) {
                value = JSON.stringify(value);
                if($.support[method])
                {
                    try { 
                        return  window[method].setItem(key, value); 
                        } 
                    catch(e){
                        return $.cookie(options.cookiePrefix + key, value, options.cookieOptions) ;
                    } 
                }
                    else 
                        return $.cookie(options.cookiePrefix + key, value, options.cookieOptions);
            };

            this.removeItem = function( key ) {
                if ($.support[method])
                {
                    try { 
                        return window[method].removeItem(key);
                    } 
                    catch(e)
                    { 
                        return $.cookie(options.cookiePrefix + key, null, $.extend(options.cookieOptions, {expires: -1})) ;
                    }
                }
                else
                    return $.cookie(options.cookiePrefix + key, null, $.extend(options.cookieOptions, {expires: -1}));
            };

            this.clear = function() {
                if($.support[method]) {
                    try{
                        return window[method].clear();
                    }
                    catch(e){
                        var reg = new RegExp('^' + options.cookiePrefix, ''),
                            opts = $.extend(options.cookieOptions, {
                                expires: -1
                            });

                        if(document.cookie && document.cookie !== ''){
                            $.map(document.cookie.split(';'), function( cookie ){
                                if(reg.test(cookie = $.trim(cookie))) {
                                     $.cookie( cookie.substr(0,cookie.indexOf('=')), null, opts);
                                }
                            });
                        }
                    }
                } else {
                    var reg = new RegExp('^' + options.cookiePrefix, ''),
                        opts = $.extend(options.cookieOptions, {
                            expires: -1
                        });

                    if(document.cookie && document.cookie !== ''){
                        $.map(document.cookie.split(';'), function( cookie ){
                            if(reg.test(cookie = $.trim(cookie))) {
                                 $.cookie( cookie.substr(0,cookie.indexOf('=')), null, opts);
                            }
                        });
                    }
                }
            };

            if (typeof key !== "undefined") {
                return typeof value !== "undefined" ? ( value === null ? this.removeItem(key) : this.setItem(key, value) ) : this.getItem(key);
            }

            return this;
        };

        $[method].options = defaults;
    });
}(jQuery, window, document));