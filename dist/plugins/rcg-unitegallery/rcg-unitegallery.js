(function(angular, $) {
    "use strict";
    var module = angular.module("rcGalleryUnitegallery", []);
    module.provider("rcGalleryUnitegallery", [ function rcGalleryUnitegalleryProvider() {
        this.loadUrls = [];
        this.setUrls = function(urls) {
            if (angular.isArray(urls)) {
                this.loadUrls = urls;
            }
        };
        this.$get = [ function() {
            var load_urls = this.loadUrls;
            return {
                getLoadUrls: function() {
                    return load_urls;
                }
            };
        } ];
    } ]);
    module.directive("rcgUnitegallery", [ "$interval", "rcGalleryUnitegallery", function($interval, rcGalleryUnitegallery) {
        return {
            restrict: "EA",
            require: "^rc-gallery",
            link: function(scope, elem, attrs, rcGalleryApi) {
                var unitegalleryApi;
                var un_watch_is_ready;
                var stop_gallery_elem;
                rcGalleryApi.addLoadUrls(rcGalleryUnitegallery.getLoadUrls());
                function stop_find_gallery_elem() {
                    $interval.cancel(stop_gallery_elem);
                }
                function init(is_ready) {
                    if (is_ready === true) {
                        un_watch_is_ready();
                        var n_interval = 0;
                        stop_gallery_elem = $interval(function() {
                            if (rcGalleryApi.mediaGalleryElement.length !== 0 && typeof rcGalleryApi.mediaGalleryElement.unitegallery === "function") {
                                stop_find_gallery_elem();
                                if (rcGalleryApi.theme && rcGalleryApi.theme.length > 0) {
                                    angular.extend(rcGalleryApi.options, {
                                        gallery_theme: rcGalleryApi.theme
                                    });
                                }
                                angular.extend(rcGalleryApi.options, {
                                    gallery_width: rcGalleryApi.width
                                });
                                angular.extend(rcGalleryApi.options, {
                                    gallery_height: rcGalleryApi.height
                                });
                                unitegalleryApi = rcGalleryApi.mediaGalleryElement.unitegallery(rcGalleryApi.options);
                                rcGalleryApi.setMediaReady();
                            } else if (n_interval >= 240) {
                                stop_find_gallery_elem();
                            }
                            n_interval++;
                        }, 250);
                    }
                }
                scope.$on("$destroy", function() {
                    if (unitegalleryApi && unitegalleryApi.destroy) {
                        unitegalleryApi.destroy();
                    }
                });
                un_watch_is_ready = scope.$watch(function() {
                    return rcGalleryApi.isReady;
                }, init);
            }
        };
    } ]);
})(angular, jQuery);
//# sourceMappingURL=rcg-unitegallery.js.map
