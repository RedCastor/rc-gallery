# rc-gallery

Angular wrapper for Unitegallery and Galleria

**[Demo][]**

Basic usage
---------------
Install bower package:
```bash
bower install --save rc-gallery
```

<h4>Usage/Example</h4>

```html
<script type="text/javascript">
    'use strict';

    var app = angular.module('app', ['rcGallery', 'rcGalleryUnitegallery', 'rcGalleryGalleria']);

    app.config(['rcGalleryUnitegalleryProvider', function (rcGalleryUnitegalleryProvider) {

        rcGalleryUnitegalleryProvider.setUrls([
            'dist/vendor/unitegallery/js/unitegallery.js',
            'dist/vendor/unitegallery/css/unitegallery.css',
            'dist/vendor/unitegallery/themes/slider/unitegallery.slider.js',
            'dist/vendor/unitegallery/themes/tiles/unitegallery.tiles.js',
            'dist/vendor/unitegallery/themes/grid/unitegallery.grid.js'
        ]);
    }]);

    app.config(['rcGalleryGalleriaProvider', function (rcGalleryGalleriaProvider) {

        rcGalleryGalleriaProvider.setUrls([
            'dist/vendor/galleria/galleria.js'
        ]);

        rcGalleryGalleriaProvider.setThemeUrls([
            'dist/vendor/galleria/themes/classic/galleria.classic.js',
            'dist/vendor/galleria/themes/fullscreen/galleria.fullscreen.js'
        ]);
    }]);

    app.controller('galleryCtrl', ['$scope', function ($scope) {

        $scope.unitegallery_theme = 'slider';

        $scope.unitegallery_options = {
            gallery_preserve_ratio: false,
            gallery_skin:'alexis',
            slider_bullets_skin: 'alexis',
            slider_enable_bullets: true,
            slider_scale_mode: 'fit'
        };

        $scope.galleria_options = {
            autoplay: false,
            thumbnails: false,
            showInfo: false,
            _toggleInfo: false
        };

        $scope.gallery = [
            {
                img: {
                    dataNgSrc: 'dist/images/loco-300x300.jpg',
                    dataImage: 'dist/images/loco-768x518.jpg',
                    dataBig_image: 'dist/images/loco.jpg',
                    dataTitle: 'Loco',
                    dataDescription: 'My description'
                },
                thumb: 'dist/images/loco-300x300.jpg',
                image: 'dist/images/loco-768x518.jpg',
                big_image: 'dist/images/loco.jpg',
                title: 'Loco',
                description: 'My description'
            },
            {
                img: {
                    dataNgSrc: 'dist/images/mining-excavator-300x300.jpg',
                    dataImage: 'dist/images/loco-768x518.jpg',
                    dataBig_image: 'dist/images/mining-excavator.jpg',
                    dataTitle: 'Mining Excavator',
                    dataDescription: 'My description'
                },
                thumb: 'dist/images/mining-excavator-300x300.jpg',
                image: 'dist/images/loco-768x518.jpg',
                big_image: 'dist/images/mining-excavator.jpg',
                title: 'Mining Excavator',
                description: 'My description'
            },
            {
                img: {
                    dataNgSrc: 'dist/images/buick-300x300.jpg',
                    dataImage: 'dist/images/buick-768x512.jpg',
                    dataBig_image: 'dist/images/buick.jpg',
                    dataTitle: 'Buick',
                    dataDescription: 'My description'
                },
                thumb: 'dist/images/buick-300x300.jpg',
                image: 'dist/images/buick-768x512.jpg',
                big_image: 'dist/images/buick.jpg',
                title: 'Buick',
                description: 'My description'
            },
            {
                img: {
                    dataNgSrc: 'dist/images/stadium-300x300.jpg',
                    dataImage: 'dist/images/stadium-768x500.jpg',
                    dataBig_image: 'dist/images/stadium.jpg',
                    dataTitle: 'Stadium',
                    dataDescription: 'My description'
                },
                thumb: 'dist/images/stadium-300x300.jpg',
                image: 'dist/images/stadium-768x500.jpg',
                big_image: 'dist/images/stadium.jpg',
                title: 'Stadium',
                description: 'My description'
            },
            {
                img: {
                    dataNgSrc: 'dist/images/bmw-300x300.jpg',
                    dataImage: 'dist/images/bmw-768x512.jpg',
                    dataBig_image: 'dist/images/bmw.jpg',
                    dataTitle: 'BMW',
                    dataDescription: 'My description'
                },
                thumb: 'dist/images/bmw-300x300.jpg',
                image: 'dist/images/bmw-768x512.jpg',
                big_image: 'dist/images/bmw.jpg',
                title: 'BMW',
                description: 'My description'
            }
        ]
    }]);
</script>
<div ng-controller="galleryCtrl">
    <rc-gallery rcg-load-urls="'dist/vendor/unitegallery/skins/alexis/unitegallery.alexis.css'" >
        <rcg-media rcg-unitegallery rcg-width="1400" rcg-height="400" rcg-sources="gallery" rcg-theme="{{unitegallery_theme}}" rcg-options="unitegallery_options" >
            <img data-ng-repeat="source in sources" rcg-source="source.img" />
        </rcg-media>
    </rc-gallery>
    
    <rc-gallery >
        <rcg-media rcg-galleria rcg-height="400" rcg-sources="gallery"  rcg-theme="classic" rcg-options="galleria_options" >
            <img data-ng-repeat="source in sources" data-ng-src="{{source.thumb}}" data-title="{{source.title}}" data-description="{{source.description}}" alt="{{source.alt}}" data-image="{{source.big_image}}" />
        </rcg-media>
    </rc-gallery>
</div>
```

[Demo]: http://redcastor.github.io/rc-gallery/demo/