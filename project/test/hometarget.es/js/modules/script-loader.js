var modules = window.modules || {};


modules.ScriptLoader = modules.ScriptLoader || (function () {

    "use strict";

    var dc = document;
    var counter = 0;
    var ts = 0;
    var callback = function () { };
    var callbackError = function () { };
    var actualPath = "";
    var loadedFiles = [];

    function ScriptLoader() { }

    ScriptLoader.prototype = {

        /**
		* Load "scripts"
		*
		* @method load
		* @member modules.scriptLoader
		* @param
		* {Object} object
		*		{Array} object.files
		*			{Object} object.files
		*				{String} object.files[].url
		*			{Array} object.files[].attributes
		*				{Object} object.files[].attributes
		*		{Bool} object.async
		*		{Function} object.callback
		*		{Function} object.callbackError
		*/

        /*
		object = {
			files: [
				{
					url: "http://..",
					attributes: [
						{ "attribute": "value" },
					]
				},
			],
			async: false,
			callback: function(){},
			callbackError: function(filename){}
		};
		*/

        load: function (object) {

            var self = this;
            var i = 0;
            var files = object.files;

            counter = 0;
            self.async = object.async;
            callback = object.callback;
            callbackError = object.callbackError;

            ts = files.length;

            // "while" instead of "for"
            while (i < ts) {

                self.insert(files[i]);
                i += 1;
            }

        },

        /**
		* execute when script trigger onload event
		*
		* @method _onload
		* @member module.ScriptLoader
		* 
		*/

        _onload: function () {

            var sc = this;
            var src = sc.getAttribute && sc.getAttribute('src');
            if (src) {
                loadedFiles.push(src);
            }

            if ((sc.readyState && sc.readyState !== 'complete' && sc.readyState !== 'loaded')) {
                callback.call(undefined);
            }

            // counter ++
            counter += 1;
            // execute callback after load all "scripts"
            if (counter === ts && typeof callback === 'function') callback.call(undefined);

        },


        /**
		* execute when script trigger onerror event
		*
		* @method _onerror
		* @member module.ScriptLoader
		*/

        _onerror: function () {
            counter += 1;
            if (typeof callbackError === 'function') callbackError.call(undefined, actualPath);

        },

        fileAlreadyLoaded: function (src) {
            return loadedFiles.indexOf(src) !== -1;
        },

        /**
		* insert script in DOM tree
		*
		* @method insert
		* @member modules.scriptLoader
		* @param {Object} fileObject
		*/

        insert: function (fileObject) {

            var self = this;
            actualPath = fileObject.url;

            if (!self.fileAlreadyLoaded(actualPath)) {
                var sc = dc.createElement('script');
                if (sc.addEventListener) {
                    sc.addEventListener("load", self._onload, false);
                } else {
                    sc.onreadystatechange = self._onload;
                }

                sc.onerror = self._onerror;

                if (fileObject.attributes) {
                    var attrs = fileObject.attributes;
                    attrs.forEach(function (att) {
                        for (var key in att) {
                            sc.setAttribute(key, att[key]);
                        }
                    });
                }

                sc.async = self.async;
                var external = actualPath.indexOf("http") === 0 || actualPath.indexOf("//") === 0;
                sc.src = (external ? "" : modules.utils.cdnHost) + actualPath;
                dc.body.appendChild(sc);
            } else {
                self._onload();
            }

            // insert the script with insertBefore to avoid DOM exceptions
            //sc.parentNode.insertBefore(sc, sc);

        }
    };

    return new ScriptLoader();

})();
