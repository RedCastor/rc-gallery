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
                thumb: 'https://dummyimage.com/300',
                image: 'https://dummyimage.com/800',
                big_image: 'https://dummyimage.com/2048',
                title: 'My title',
                description: 'My description'
            },
            {
                thumb: 'https://dummyimage.com/300',
                image: 'https://dummyimage.com/800',
                big_image: 'https://dummyimage.com/2048',
                title: 'My title',
                description: 'My description'
            },
            {
                thumb: 'https://dummyimage.com/300',
                image: 'https://dummyimage.com/800',
                big_image: 'https://dummyimage.com/2048',
                title: 'My title',
                description: 'My description'
            },
            {
                thumb: 'https://dummyimage.com/300',
                image: 'https://dummyimage.com/800',
                big_image: 'https://dummyimage.com/2048',
                title: 'My title',
                description: 'My description'
            },
            {
                thumb: 'https://dummyimage.com/300',
                image: 'https://dummyimage.com/800',
                big_image: 'https://dummyimage.com/2048',
                title: 'My title',
                description: 'My description'
            }
        ]
    }]);
</script>
<div ng-controller="galleryCtrl">
    <rc-gallery rcg-load-urls="'dist/vendor/unitegallery/skins/alexis/unitegallery.alexis.css'" >
        <rcg-media rcg-unitegallery rcg-width="1400" rcg-height="400" rcg-sources="gallery" rcg-theme="{{unitegallery_theme}}" rcg-options="unitegallery_options" >
            <img data-ng-repeat="source in sources" data-ng-src="{{source.thumb}}" data-title="{{source.title}}" data-description="{{source.description}}" alt="{{source.alt}}" data-image="{{source.big_image}}" />
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