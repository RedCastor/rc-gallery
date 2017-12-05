(function (angular) {

    'use strict';

    var module = angular.module('rcGallery');


    //rcg Media run link at priority 100 to answer plugin is linked before.
    module.directive('rcgMedia', [ '$log', '$timeout', function ( $log, $timeout ) {
        return {
            restrict: 'EA',
            require: "^rc-gallery",
            transclude: true,
            priority: 100,
            scope: {
                id: '@rcgId',
                width: '@rcgWidth',
                height: '@rcgHeight',
                theme: '@rcgTheme',
                options: '&rcgOptions',
                sources: '=?rcgSources'
            },
            templateUrl: function (elem, attrs) {
                return attrs.templateUrl  || 'rcg-media.tpl.html';
            },
            link: function (scope, elem, attrs, rcGalleryApi, transclude) {

                var gallery_elem = angular.element(elem).find('[rcg-transclude]');

                scope.id = angular.isDefined(scope.id) ? scope.id : 'rcg_media_' + Math.random().toString(36).substr(2, 10);
                scope.options = angular.isObject(scope.options()) ? scope.options() : {};


                // FUNCTIONS
                scope.onChangeSources = function (newValue, oldValue) {

                    if ( (newValue !== oldValue) && angular.isArray(newValue) ) {

                        scope.sources = newValue;
                        rcGalleryApi.sources = newValue;

                    }
                };

                rcGalleryApi.mediaElement = angular.element(elem);
                rcGalleryApi.mediaId = scope.id;
                rcGalleryApi.theme = scope.theme;
                rcGalleryApi.width = scope.width;
                rcGalleryApi.height = scope.height;
                rcGalleryApi.options = scope.options;
                rcGalleryApi.sources = scope.sources;

                scope.rcGalleryApi = rcGalleryApi;

                //Add Id to element transclude
                if ( !attrs.id ) {
                    angular.element(elem).find('[rcg-transclude]').attr('id' , scope.id);
                }

                //Transclude and pass scope.
                transclude(scope, function(clone, scope) {
                    gallery_elem.append(clone);
                });

                rcGalleryApi.onMediaReady();

                //Watchers
                scope.$watchCollection('sources', scope.onChangeSources);
                scope.$watchCollection('rcGalleryApi.sources', scope.onChangeSources);
            }
        };
    }]);

}(angular));
