(function (angular) {

    'use strict';

    var module = angular.module('rcGallery');


    /**
     * Set attribute to element by object
     *
     * rcg Source eval the attribute directive and set attribute to element from source object by key val.
     * For attribute with dash use the Camel case notation. (Like angular directive)
     *
     * For solve the problem with unitegallery and different source video or image on the same gallery.
     * Example combine image and video on the same gallery.
     */
    module.directive('rcgSource', [ function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {

                //Only if attribute is set
                if (attrs.rcgSource) {
                    var source = scope.$eval(attrs.rcgSource);

                    if (angular.isObject(source)) {
                        angular.forEach(source, function(value, key) {

                            if (key.indexOf('$') !== 0) {
                                //Camel case to dash convertion
                                var attr = key.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});

                                if (attr.length > 0) {
                                    attrs.$set( attr, value);
                                }
                            }
                        });
                    }

                }
            }
        };
    }]);

}(angular));
