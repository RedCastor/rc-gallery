(function(angular){
    'use strict';

    // Load module rcGallery
    var module = angular.module('rcGallery');


    module.provider('rcGallery', [ function rcGalleryProvider() {

        this.loadUrls = [];

        this.setUrls = function( urls ){
            if ( angular.isArray(urls) ) {
                this.loadUrls = urls;
            }
        };

        this.$get = [ function() {

            var load_urls = this.loadUrls;

            return {
                getLoadUrls: function () {
                    return load_urls;
                }
            };
        }];

    }]);


    module.factory('rcGalleryLazyload', [ '$q', function ( $q ) {

        /**
         * Create Event compatibility for IE
         *
         * @param eventName
         * @returns {Event}
         * @private
         */
        function _createNewEvent( eventName ) {

            if( typeof(Event) === 'function' ) {
                return new Event( eventName );
            }
            else {
                var _custom_event = document.createEvent('Event');
                _custom_event.initEvent(eventName, true, true);

                return _custom_event;
            }
        }

        var lazyload = {

            /**
             * Load urls async for js or css extension
             * this insert in dom the tag script or link and return a promise for all url.
             *
             * @param urls
             * @return promise
             */
            get: function (urls){
                var promises = [];

                angular.forEach(urls , function(url) {
                    var url_deferred = $q.defer();
                    var script;

                    switch(url.split('.').pop()) {
                        case 'css':
                            script = angular.element('link[href="' + url + '"]');

                            if (!script[0]) {
                                script = document.createElement('link');
                                script.rel = 'stylesheet';
                                script.type = 'text/css';
                                script.async = false;
                                script.href = url;
                            }
                            break;
                        case 'js':
                            script = angular.element('script[src="' + url + '"]');

                            if (!script[0]) {
                                script = document.createElement('script');
                                script.type = 'text/javascript';
                                script.async = false;
                                script.src = url;
                            }
                            break;
                    }

                    //If script dom element not exist create the dom element.
                    if (!script[0]) {

                        //Create event for other instance of rcGAlleria to catch same script loaded or error.
                        var event_on_complete = _createNewEvent('onRcGalleryLazyloadComplete');
                        var event_on_error = _createNewEvent('onRcGalleryLazyloadError');

                        script.onload = function(){
                            script.dispatchEvent(event_on_complete);
                            url_deferred.resolve(script);
                        };

                        script.onError = function(){
                            script.dispatchEvent(event_on_error);
                            url_deferred.reject(script);
                        };

                        document.head.appendChild(script);
                    }
                    //If script dom exist attach event for catch script loaded complete or loaded error.
                    else if (script[0]) {
                        script[0].addEventListener('onRcGalleryLazyloadComplete', function () {
                            script[0].removeEventListener('onRcGalleryLazyloadComplete', this);
                            url_deferred.resolve(script);
                        });

                        script[0].addEventListener('onRcGalleryLazyloadError', function () {
                            script[0].removeEventListener('onRcGalleryLazyloadError', this);
                            url_deferred.reject(script);
                        });
                    }
                    else {
                        url_deferred.resolve(script);
                    }


                    this.push(url_deferred.promise);
                }, promises);


                return $q.all(promises);
            }
        };


        return lazyload;
    }]);
})(angular);