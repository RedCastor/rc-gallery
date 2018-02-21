(function(angular) {
    "use strict";
    var module = angular.module("rcGallery", []);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("rcGallery");
    module.directive("rcgMedia", [ function() {
        return {
            restrict: "EA",
            require: "^rc-gallery",
            transclude: true,
            priority: 100,
            scope: {
                id: "@rcgId",
                width: "@rcgWidth",
                height: "@rcgHeight",
                theme: "@rcgTheme",
                options: "&rcgOptions",
                sources: "=?rcgSources"
            },
            templateUrl: function(elem, attrs) {
                return attrs.templateUrl || "rcg-media.tpl.html";
            },
            link: function(scope, elem, attrs, rcGalleryApi, transclude) {
                var gallery_elem = angular.element(elem).find("[rcg-transclude]");
                scope.id = angular.isDefined(scope.id) ? scope.id : "rcg_media_" + Math.random().toString(36).substr(2, 10);
                scope.options = angular.isObject(scope.options()) ? scope.options() : {};
                scope.onChangeSources = function(newValue, oldValue) {
                    if (newValue !== oldValue && angular.isArray(newValue)) {
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
                if (!attrs.id) {
                    angular.element(elem).find("[rcg-transclude]").attr("id", scope.id);
                }
                transclude(scope, function(clone, scope) {
                    gallery_elem.append(clone);
                });
                rcGalleryApi.onMediaReady();
                scope.$watchCollection("sources", scope.onChangeSources);
                scope.$watchCollection("rcGalleryApi.sources", scope.onChangeSources);
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("rcGallery");
    module.directive("rcgSource", [ function() {
        return {
            restrict: "A",
            link: function(scope, elem, attrs) {
                if (attrs.rcgSource) {
                    var source = scope.$eval(attrs.rcgSource);
                    if (angular.isObject(source)) {
                        angular.forEach(source, function(value, key) {
                            if (key.indexOf("$") !== 0) {
                                var attr = key.replace(/([A-Z])/g, function($1) {
                                    return "-" + $1.toLowerCase();
                                });
                                if (attr.length > 0 && !attrs[attr]) {
                                    attrs.$set(attr, value);
                                }
                            }
                        });
                    }
                }
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("rcGallery");
    module.directive("rcGallery", [ function() {
        return {
            restrict: "EA",
            scope: {
                loadUrls: "&rcgLoadUrls",
                onGalleryReady: "&rcgOnGalleryReady"
            },
            controller: "rcGalleryCtrl",
            controllerAs: "rcGalleryApi",
            link: {
                pre: function(scope, elem, attrs, controller) {
                    scope.rcGalleryApi.rcGalleryElement = angular.element(elem);
                }
            }
        };
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("rcGallery");
    module.controller("rcGalleryCtrl", [ "$scope", "$log", "rcGallery", "rcGalleryLazyload", function($scope, $log, rcGallery, rcGalleryLazyload) {
        var rcGalleryApi = this;
        this.rcGalleryElement = null;
        this.init = function() {
            this.isReady = false;
            this.isMediaReady = false;
            this.mediaElement = null;
            this.mediaGalleryElement = null;
            this.mediaId = null;
            this.loadUrls = rcGallery.getLoadUrls();
            $scope.loadUrls = angular.isDefined($scope.loadUrls()) ? $scope.loadUrls() : undefined;
            if ($scope.loadUrls) {
                this.addLoadUrls($scope.loadUrls);
            }
        };
        this.onMediaReady = function() {
            if (rcGalleryApi.mediaElement.length !== 0) {
                rcGalleryLazyload.get(rcGalleryApi.loadUrls).then(function(response_success) {
                    $log.debug("rcGallery Ready: " + rcGalleryApi.mediaId);
                    rcGalleryApi.mediaGalleryElement = rcGalleryApi.mediaElement.find("#" + rcGalleryApi.mediaId);
                    rcGalleryApi.isReady = true;
                    $scope.onGalleryReady({
                        $rcGalleryApi: rcGalleryApi
                    });
                }, function(response_error) {
                    $log.error("rcGallery Error to load urls");
                });
            } else {
                $log.error("rcGallery Media Element ID not found");
            }
        };
        this.addLoadUrls = function(urls) {
            if (urls && urls.length > 0) {
                var theme_urls = this.loadUrls;
                if (angular.isArray(urls)) {
                    angular.forEach(urls, function(value, key) {
                        if (this.indexOf(value) === -1) {
                            this.push(value);
                        }
                    }, this.loadUrls);
                } else if (angular.isString(urls)) {
                    if (this.loadUrls.indexOf(urls) === -1) {
                        this.loadUrls.push(urls);
                    }
                }
            }
        };
        this.setMediaReady = function() {
            this.isMediaReady = true;
        };
        this.init();
    } ]);
})(angular);

(function(angular) {
    "use strict";
    var module = angular.module("rcGallery");
    module.provider("rcGallery", [ function rcGalleryProvider() {
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
    module.factory("rcGalleryLazyload", [ "$q", function($q) {
        function _createNewEvent(eventName) {
            if (typeof Event === "function") {
                return new Event(eventName);
            } else {
                var _custom_event = document.createEvent("Event");
                _custom_event.initEvent(eventName, true, true);
                return _custom_event;
            }
        }
        var lazyload = {
            get: function(urls) {
                var promises = [];
                console.log("Get source plugin");
                angular.forEach(urls, function(url) {
                    var url_deferred = $q.defer();
                    var script;
                    switch (url.split(".").pop()) {
                      case "css":
                        script = angular.element('link[href="' + url + '"]');
                        if (!script[0]) {
                            script = document.createElement("link");
                            script.rel = "stylesheet";
                            script.type = "text/css";
                            script.async = false;
                            script.href = url;
                        }
                        break;

                      case "js":
                        script = angular.element('script[src="' + url + '"]');
                        if (!script[0]) {
                            script = document.createElement("script");
                            script.type = "text/javascript";
                            script.async = false;
                            script.src = url;
                        }
                        break;
                    }
                    if (!script[0]) {
                        var event_on_complete = _createNewEvent("onRcGalleryLazyloadComplete");
                        var event_on_error = _createNewEvent("onRcGalleryLazyloadError");
                        script.onload = function() {
                            script.setAttribute("loaded", "true");
                            script.dispatchEvent(event_on_complete);
                            url_deferred.resolve(script);
                        };
                        script.onError = function() {
                            script.setAttribute("loaded", "false");
                            script.dispatchEvent(event_on_error);
                            url_deferred.reject(script);
                        };
                        document.head.appendChild(script);
                    }
                    if (script.lenght > 1 && !script.getAttribute("loaded")) {
                        script[0].addEventListener("onRcGalleryLazyloadComplete", function() {
                            script[0].removeEventListener("onRcGalleryLazyloadComplete", this);
                            url_deferred.resolve(script);
                        });
                        script[0].addEventListener("onRcGalleryLazyloadError", function() {
                            script[0].removeEventListener("onRcGalleryLazyloadError", this);
                            url_deferred.reject(script);
                        });
                    } else {
                        url_deferred.resolve(script);
                    }
                    this.push(url_deferred.promise);
                }, promises);
                console.log(promises);
                return $q.all(promises);
            }
        };
        return lazyload;
    } ]);
})(angular);

angular.module("rcGallery").run([ "$templateCache", function($templateCache) {
    $templateCache.put("rcg-media.tpl.html", '<div data-ng-show="rcGalleryApi.isMediaReady" class="rcg-media" rcg-transclude ></div>');
} ]);
//# sourceMappingURL=rc-gallery.js.map
