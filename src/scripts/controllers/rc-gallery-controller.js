(function(angular) {
    'use strict';


    var module = angular.module('rcGallery');

    module.controller("rcGalleryCtrl", [ '$scope', '$log', 'rcGallery', 'rcGalleryLazyload', function ($scope, $log, rcGallery, rcGalleryLazyload) {

        var rcGalleryApi = this;
        this.rcGalleryElement = null;


        /**
         * Init Controller
         */
        this.init = function () {

            this.isReady = false;
            this.isMediaReady = false;
            this.mediaElement = null;
            this.mediaGalleryElement = null;
            this.mediaId = null;

            this.loadUrls = rcGallery.getLoadUrls();

            $scope.loadUrls = angular.isDefined($scope.loadUrls()) ? $scope.loadUrls() : undefined;

            if ( $scope.loadUrls) {
                this.addLoadUrls($scope.loadUrls);
            }
        };


        this.onMediaReady = function () {

            if (rcGalleryApi.mediaElement.length !== 0) {

                rcGalleryLazyload.get(rcGalleryApi.loadUrls).then(
                    function (response_success) {

                        $log.debug('rcGallery Ready: ' + rcGalleryApi.mediaId );

                        rcGalleryApi.mediaGalleryElement = rcGalleryApi.mediaElement.find('#' + rcGalleryApi.mediaId);

                        rcGalleryApi.isReady = true;
                        $scope.onGalleryReady({$rcGalleryApi: rcGalleryApi});

                    },
                    function (response_error) {
                        $log.error('rcGallery Error to load urls');
                    }
                );

            }
            else {
                $log.error('rcGallery Media Element ID not found');
            }
        };


        this.addLoadUrls = function (urls) {

            if ( urls && urls.length > 0 ) {
                var theme_urls = this.loadUrls;

                if ( angular.isArray(urls) ) {
                    angular.forEach(urls, function(value, key) {

                        if( this.indexOf(value) === -1 ){
                            this.push(value);
                        }
                    }, this.loadUrls );
                }
                else if ( angular.isString(urls) ) {
                    if( this.loadUrls.indexOf(urls) === -1 ){
                        this.loadUrls.push(urls);
                    }
                }
            }
        };


        this.setMediaReady = function () {
            this.isMediaReady = true;
        };


        //Init
        this.init();
    }]);

})(angular);
