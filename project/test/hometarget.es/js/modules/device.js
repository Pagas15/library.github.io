var modules = window.modules || {};

(function () {

    var ua = navigator.userAgent.toLowerCase();

    modules.device = {
        iOSVersion: function () {
            var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
            return this.iOS() ? parseFloat(v[1], 10) + '.' + parseInt(v[2], 10) : false
        },

        iOS: function (v) {
            var iOS = !!ua.match(/iphone|ipad/i);
            var vRegExp = new RegExp('os ' + v, 'i');

            return !!((iOS && !v) || (iOS && v && ua.match(vRegExp)));
        },

        iPhone: function () {
            return !!ua.match(/iphone/i);
        },

        iPad: function () {
            return !!ua.match(/ipad/i);
        },

        androidVersion: function () {
            return this.android() ? parseFloat(ua.slice(ua.indexOf("android") + 8)) : false
        },

        android: function (v) {
            var android = !!ua.match(/android/i);
            var vRegExp = new RegExp('android ' + v, 'i');

            return !!((android && !v) || (android && v && ua.match(vRegExp)));
        },

        wp: function (v) {
            var wp = !!ua.match(/windows phone|wp/i);
            var vRegExp = new RegExp('os ' + v + '|' + v, 'i');

            return !!((wp && !v) || (wp && v && ua.match(vRegExp)));
        }
    }

})();