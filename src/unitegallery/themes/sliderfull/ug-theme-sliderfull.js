/**
 * Slider Full (with lightbox)
 */
if(typeof g_ugFunctions != "undefined")
	g_ugFunctions.registerTheme("sliderfull");
else 
	jQuery(document).ready(function(){g_ugFunctions.registerTheme("sliderfull")});


/**
 * Slider full gallery theme
 */
function UGTheme_sliderfull(){

	var t = this;
	var g_gallery = new UniteGalleryMain(), g_objGallery, g_objects, g_objWrapper; 
	var g_objThumbs, g_objSlider;
    var g_lightbox = new UGLightbox();
	var g_functions = new UGFunctions();
	
	
	//theme options
	var g_options = {
		
	};
	
	
	var g_defaults = {
		gallery_autoplay: true,
		
		slider_scale_mode:"fill",
		slider_controls_always_on:true,
		slider_enable_text_panel:false,
		slider_controls_appear_ontap: true,			//appear controls on tap event on touch devices			
		slider_enable_bullets: true,
		slider_enable_arrows: true,
		slider_enable_play_button: false,
		slider_enable_fullscreen_button:false,
		slider_enable_zoom_panel: false,
		slider_vertical_scroll_ondrag: true,
	};
	
	
	/**
	 * init 
	 */
	this.init = function(gallery, customOptions){
		
		g_gallery = gallery;
		
		g_options = jQuery.extend(g_options, g_defaults);
		g_options = jQuery.extend(g_options, customOptions);
		
		//set gallery options
		g_gallery.setOptions(g_options);
		
		g_gallery.initSlider(g_options);
		
		g_objects = gallery.getObjects();
		
		//get some objects for local use
		g_objGallery = jQuery(gallery);		
		g_objWrapper = g_objects.g_objWrapper;

        //init objects
        g_lightbox.init(gallery, g_options);

		g_objSlider = g_objects.g_objSlider;

        //objSlide.children(".ug-button-videoplay");
	};

	
	/**
	 * set gallery html elements
	 */
	function setHtml(){
		
		//add html elements
		g_objWrapper.addClass("ug-theme-slider");
		
		//set slider html
		if(g_objSlider) {
            g_objSlider.setHtml();

            g_lightbox.putHtml();
		}
	}
	
	
	/**
	 * place the slider according the thumbs panel size and position
	 */
	function placeSlider(){
		
		 var sliderHeight = g_gallery.getHeight();
		 var sliderWidth = g_gallery.getWidth();
		 
		 g_objSlider.setSize(sliderWidth, sliderHeight);
		 g_objSlider.setPosition(0, 0);		
	}
	

	
	/**
	 * on gallery size change - resize the theme.
	 */
	function onSizeChange(){
			
		placeSlider();
				
	}

    /**
     * on slide click - open lightbox
     */
    function onSlideClick(data, objSlide){

        var objSlide = jQuery(objSlide);

        var index = g_objSlider.getCurrentItemIndex();

        g_lightbox.open(index);
    }
	
	/**
	 * init buttons functionality and events
	 */
	function initEvents(){
						
		g_objGallery.on(g_gallery.events.SIZE_CHANGE,onSizeChange);
		//g_objGallery.on(g_gallery.events.ITEM_CHANGE,onItemChange);

        //on click events
        jQuery(g_objSlider).on(g_objSlider.events.CLICK, onSlideClick);
	}

	/**
	 * init all the theme's elements and set them to their places 
	 * according gallery's dimentions.
	 * this function should work on resize too.
	 */
	function initAndPlaceElements(){
		placeSlider();

		g_objSlider.run();

        g_lightbox.run();
	}


    /**
     * actually run the theme
     */
    function actualRun(){

        initAndPlaceElements();

        initEvents();

        var sliderElement = g_objSlider.getElement();

        //Remove Event Play video
        jQuery(sliderElement).find('.ug-button-videoplay').each(function( index ) {
            jQuery(this).off();
        });

        //Remove video player in slider
        jQuery(sliderElement).find('.ug-videoplayer').remove();
    }


	/**
	 * run the theme setting
	 */
	this.run = function(){
		
		setHtml();

        actualRun();
	};


    /**
     * destroy the slider events
     */
    this.destroy = function(){


        jQuery(g_objSlider).off(g_objSlider.events.CLICK);

        g_lightbox.destroy();
    };

	
}
