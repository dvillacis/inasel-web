
(function() {
	'use strict';
	//console.log("Loading utility functions");

	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !angular.element(window).requestAnimationFrame; ++x) {
		angular.element(window).requestAnimationFrame = angular.element(window)[vendors[x]+'RequestAnimationFrame'];
		angular.element(window).cancelAnimationFrame = angular.element(window)[vendors[x]+'CancelAnimationFrame']
			|| angular.element(window)[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!angular.element(window).requestAnimationFrame)
		angular.element(window).requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = angular.element(window).setTimeout(function() { callback(currTime + timeToCall); },
			timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!angular.element(window).cancelAnimationFrame)
		angular.element(window).cancelAnimationFrame = function(id) {
		clearTimeout(id);
		};

})();


var SEMICOLON = SEMICOLON || {};

(function(){
	'use strict';
	SEMICOLON.initialize = {
		init: function() {
			SEMICOLON.initialize.responsiveClasses();
		},

		responsiveClasses: function() {
			var jRes = jRespond([
				{
					label: 'smallest',
					enter: 0,
					exit: 479
				},{
					label: 'handheld',
					enter: 480,
					exit: 767
				},{
					label: 'tablet',
					enter: 768,
					exit: 991
				},{
					label: 'laptop',
					enter: 992,
					exit: 1199
				},{
					label: 'desktop',
					enter: 1200,
					exit: 10000
				}
			]);
			jRes.addFunc([
				{
					breakpoint: 'desktop',
					enter: function() { ng_body.addClass('device-lg'); },
					exit: function() { ng_body.removeClass('device-lg'); }
				},{
					breakpoint: 'laptop',
					enter: function() { ng_body.addClass('device-md'); },
					exit: function() { ng_body.removeClass('device-md'); }
				},{
					breakpoint: 'tablet',
					enter: function() { ng_body.addClass('device-sm'); },
					exit: function() { ng_body.removeClass('device-sm'); }
				},{
					breakpoint: 'handheld',
					enter: function() { ng_body.addClass('device-xs'); },
					exit: function() { ng_body.removeClass('device-xs'); }
				},{
					breakpoint: 'smallest',
					enter: function() { ng_body.addClass('device-xxs'); },
					exit: function() { ng_body.removeClass('device-xxs'); }
				}
			]);
		},

		goToTopScroll: function() {
			if( ng_body.hasClass('device-lg') || ng_body.hasClass('device-md') || ng_body.hasClass('device-sm') ) {
				if(angular.element(window).scrollTop() > 450) {
					angular.element('#gotoTop').fadeIn();
				} else {
					angular.element('#gotoTop').fadeOut();
				}
			}
		},

		gotoTop: function() {
			ng_goToTopEl.click(function() {
				angular.element('body,html').stop(true).animate({scrollTop:0},400);
				return false;
			});
		},

		setFullColumnWidth: function( element ) {

			if( element.hasClass('portfolio-full') ) {
				var columns = SEMICOLON.initialize.defineColumns( element );
				var containerWidth = element.width();
				if( containerWidth == ( Math.floor(containerWidth/columns) * columns ) ) { containerWidth = containerWidth - 1; }
				var postWidth = Math.floor(containerWidth/columns);
				if( $body.hasClass('device-xxs') ) { var deviceSmallest = 1; } else { var deviceSmallest = 0; }
				element.find(".portfolio-item").each(function(index){
					if( deviceSmallest == 0 && $(this).hasClass('wide') ) { var elementSize = ( postWidth*2 ); } else { var elementSize = postWidth; }
					$(this).css({"width":elementSize+"px"});
				});
			} else if( element.hasClass('masonry-thumbs') ) {
				var columns = SEMICOLON.initialize.defineColumns( element ),
					containerWidth = element.innerWidth(),
					windowWidth = $window.width();
				if( containerWidth == windowWidth ){
					containerWidth = windowWidth*1.004;
					element.css({ 'width': containerWidth+'px' });
				}
				var postWidth = (containerWidth/columns);

				postWidth = Math.floor(postWidth);

				if( ( postWidth * columns ) >= containerWidth ) { element.css({ 'margin-right': '-1px' }); }

				element.children('a').css({"width":postWidth+"px"});

				var firstElementWidth = element.find('a:eq(0)').outerWidth();

				element.isotope({
					masonry: {
						columnWidth: firstElementWidth
					}
				});

				var bigImageNumbers = element.attr('data-big');
				if( bigImageNumbers ) {
					bigImageNumbers = bigImageNumbers.split(",");
					var bigImageNumber = '',
						bigi = '';
					for( bigi = 0; bigi < bigImageNumbers.length; bigi++ ){
						bigImageNumber = Number(bigImageNumbers[bigi]) - 1;
						element.find('a:eq('+bigImageNumber+')').css({ width: firstElementWidth*2 + 'px' });
					}
					var t = setTimeout( function(){
						//element.isotope('layout');
					}, 1000 );
				}
			}
		}
	};

	SEMICOLON.slider = {

		init: function() {
			SEMICOLON.slider.initSwiper();	

		},

		initSwiper: function() {
			var swiperSlider = new Swiper('.swiper-container', {
				speed: 400,
				autoplay: 5000,
				autoplayDisableOnInteraction: true,
				// Navigation arrows
			    nextButton: '.swiper-button-next',
			    prevButton: '.swiper-button-prev',
			});

			angular.element('#slider-arrow-left').on('click', function(e){
				//e.preventDefault();
				//swiperSlider.slidePrev();
				angular.element('#slide-number-current').html(swiperSlider.activeIndex + 1);
				angular.element('#slide-number-total').html(swiperSlider.slides.length);
			});

			angular.element('#slider-arrow-right').on('click', function(e){
				//e.preventDefault();
				//swiperSlider.slideNext();
				angular.element('#slide-number-current').html(swiperSlider.activeIndex + 1);
				angular.element('#slide-number-total').html(swiperSlider.slides.length);
			});

			angular.element('#slide-number-current').html(swiperSlider.activeIndex + 1);
			angular.element('#slide-number-total').html(swiperSlider.slides.length);
		}

	};

	SEMICOLON.portfolio = {

		init: function() {
			SEMICOLON.portfolio.initIsotope();
		},

		initIsotope: function() {
			var ng_container = angular.element('#portfolio');

			ng_container.isotope({
				transitionDuration: '0.65s' 

			});

			angular.element('#portfolio-filter a').click(function(){
				angular.element('#portfolio-filter li').removeClass('activeFilter');
				angular.element(this).parent('li').addClass('activeFilter');
				var selector = angular.element(this).attr('data-filter');
				console.log('Filtering: ' + selector);	
				ng_container.isotope({ filter: selector });
				console.log(ng_container.isotope);

				return false;
			});

			angular.element(window).resize(function() {
				ng_container.isotope('layout');
			});

		},

		arrange: function() {
			console.log('Arranging...');
			SEMICOLON.initialize.setFullColumnWidth( angular.element('#portfolio') );
			$('#portfolio.portfolio-full').isotope('layout');
		}

	};

	SEMICOLON.carousel = {

		init: function() {

		},

		initOwlCarousel: function() {
			var ocTeam = angular.element("#oc-team-list");
			ocTeam.owlCarousel({
				items: 2,
				autoPlay: true
			});
		}

	};

	SEMICOLON.map = {
		init: function(NgMap) {
			console.log('initializing map');
			NgMap.getMap().then(function(map) {
				console.log(map);
			});
		}
	};

	SEMICOLON.header = {
		init: function() {
			SEMICOLON.header.superfish();
			SEMICOLON.header.menuFunctions();
			SEMICOLON.header.fullWidthMenu();
			SEMICOLON.header.overlayMenu();
			SEMICOLON.header.logo();
		},

		superfish: function() {
			if ( angular.element().superfish ) {
				if( ng_body.hasClass('device-lg') || ng_body.hasClass('device-md') ) {
					angular.element('#primary-menu ul ul, #primary-menu ul .mega-menu-content').css('display', 'block');
					SEMICOLON.header.menuInvert();
				}

				angular.element('body:not(.side-header) #primary-menu > ul, body:not(.side-header) #primary-menu > div > ul,.top-links > ul').superfish({
					popUpSelector: 'ul,.mega-menu-content,.top-link-section',
					delay: 250,
					speed: 350,
					animation: {opacity:'show'},
					animationOut:  {opacity:'hide'},
					cssArrows: false
				});

				angular.element('body.side-header #primary-menu > ul').superfish({
					popUpSelector: 'ul',
					delay: 250,
					speed: 350,
					animation: {opacity:'show',height:'show'},
					animationOut:  {opacity:'hide',height:'hide'},
					cssArrows: false
				});
			}
		},

		menuInvert: function() {
			angular.element('#primary-menu .mega-menu-content, #primary-menu ul ul').each( function( index, element ){
				var ng_menuChildElement = angular.element(element);
				var windowWidth = ng_window.width();
				var menuChildOffset = ng_menuChildElement.offset();
				var menuChildWidth = ng_menuChildElement.width();
				var menuChildLeft = menuChildOffset.left;

				if(windowWidth - (menuChildWidth + menuChildLeft) < 0) {
					ng_menuChildElement.addClass('menu-pos-invert');
				}
			});
		},

		menuFunctions: function() {
			angular.element( '#primary-menu ul li:has(ul)' ).addClass('sub-menu');
			angular.element( '.top-links ul li:has(ul) > a' ).append( ' <i class="icon-angle-down"></i>' );
			angular.element( '.top-links > ul' ).addClass( 'clearfix' );

			if( ng_body.hasClass('device-lg') || ng_body.hasClass('device-md') ) {
				angular.element('#primary-menu.sub-title > ul > li').hover(function() {
					angular.element(this).prev().css({ backgroundImage : 'none' });
				}, function() {
					angular.element(this).prev().css({ backgroundImage : 'url("images/icons/menu-divider.png")' });
				});

				angular.element('#primary-menu.sub-title').children('ul').children('.current').prev().css({ backgroundImage : 'none' });
			}

			if( SEMICOLON.isMobile.Android() ) {
				angular.element( '#primary-menu ul li.sub-menu' ).children('a').on('touchstart', function(e){
					if( !angular.element(this).parent('li.sub-menu').hasClass('sfHover') ) {
						e.preventDefault();
					}
				});
			}

			if( SEMICOLON.isMobile.Windows() ) {
				angular.element('#primary-menu > ul, #primary-menu > div > ul,.top-links > ul').superfish('destroy').addClass('windows-mobile-menu');

				angular.element( '#primary-menu ul li:has(ul)' ).append('<a href="#" class="wn-submenu-trigger"><i class="icon-angle-down"></i></a>');

				angular.element( '#primary-menu ul li.sub-menu' ).children('a.wn-submenu-trigger').click( function(e){
					angular.element(this).parent().toggleClass('open');
					angular.element(this).parent().find('> ul, > .mega-menu-content').stop(true,true).toggle();
					return false;
				});
			}
		},

		fullWidthMenu: function(){
			if( ng_body.hasClass('stretched') ) {
				if( angular.element('#header').find('.container-fullwidth').length > 0 ) { angular.element('.mega-menu .mega-menu-content').css({ 'width': ng_wrapper.width() - 120 }); }
				if( angular.element('#header').hasClass('full-header') ) { angular.element('.mega-menu .mega-menu-content').css({ 'width': ng_wrapper.width() - 60 }); }
			} else {
				if( angular.element('#header').find('.container-fullwidth').length > 0 ) { angular.element('.mega-menu .mega-menu-content').css({ 'width': ng_wrapper.width() - 120 }); }
				if( angular.element('#header').hasClass('full-header') ) { angular.element('.mega-menu .mega-menu-content').css({ 'width': ng_wrapper.width() - 80 }); }
			}
		},

		overlayMenu: function(){
			if( ng_body.hasClass('overlay-menu') ) {
				var overlayMenuItem = angular.element('#primary-menu').children('ul').children('li'),
					overlayMenuItemHeight = overlayMenuItem.outerHeight(),
					overlayMenuItemTHeight = overlayMenuItem.length * overlayMenuItemHeight,
					firstItemOffset = ( ng_window.height() - overlayMenuItemTHeight ) / 2;

				angular.element('#primary-menu').children('ul').children('li:first-child').css({ 'margin-top': firstItemOffset+'px' });
			}
		},

		stickyMenu: function( headerOffset ) {
			if (angular.element(window).scrollTop() > headerOffset) {
				if( ng_body.hasClass('device-lg') || ng_body.hasClass('device-md') ) {
					angular.element('body:not(.side-header) #header:not(.no-sticky)').addClass('sticky-header');
					angular.element('#page-menu:not(.dots-menu,.no-sticky)').addClass('sticky-page-menu');
					if( !angular.element('#header-wrap').hasClass('force-not-dark') ) { angular.element('#header-wrap').removeClass('not-dark'); }
					SEMICOLON.header.stickyMenuClass();
				} else if( ng_body.hasClass('device-xs') || ng_body.hasClass('device-xxs') || ng_body.hasClass('device-sm') ) {
					if( ng_body.hasClass('sticky-responsive-menu') ) {
						angular.element('#header:not(.no-sticky)').addClass('responsive-sticky-header');
						SEMICOLON.header.stickyMenuClass();
					}
					if( ng_body.hasClass('sticky-responsive-pagemenu') ) {
						angular.element('#page-menu:not(.dots-menu,.no-sticky)').addClass('sticky-page-menu');
					}
				}
			} else {
				SEMICOLON.header.removeStickyness();
			}
		},

		logo: function(){
			defaultLogo = angular.element('#logo').find('.standard-logo');
			defaultLogoImg = defaultLogo.attr('data-dark-logo');
			defaultStickyLogo = defaultLogo.attr('data-sticky-logo');
			if( ( angular.element('#header').hasClass('dark') || ng_body.hasClass('dark') ) && !angular.element('#header-wrap').hasClass('not-dark') ) {
				if( defaultDarkLogo ){ defaultLogo.find('img').attr('src', defaultDarkLogo); }
				if( retinaDarkLogo ){ retinaLogo.find('img').attr('src', retinaDarkLogo); }
			} else {
				if( defaultLogoImg ){ defaultLogo.find('img').attr('src', defaultLogoImg); }
				if( retinaLogoImg ){ retinaLogo.find('img').attr('src', retinaLogoImg); }
			}
			if( angular.element('#header').hasClass('sticky-header') ) {
				if( defaultStickyLogo ){ defaultLogo.find('img').attr('src', defaultStickyLogo); }
				if( retinaStickyLogo ){ retinaLogo.find('img').attr('src', retinaStickyLogo); }
			}
			if( ng_body.hasClass('device-xs') || ng_body.hasClass('device-xxs') ) {
				if( defaultMobileLogo ){ defaultLogo.find('img').attr('src', defaultMobileLogo); }
				if( retinaMobileLogo ){ retinaLogo.find('img').attr('src', retinaMobileLogo); }
			}
		},

		stickyMenuClass: function() {
			if( stickyMenuClasses ) { var newClassesArray = stickyMenuClasses.split(/ +/); } else { var newClassesArray = ''; }
			var noOfNewClasses = newClassesArray.length;

			if( noOfNewClasses > 0 ) {
				var i = 0;
				for( i=0; i<noOfNewClasses; i++ ) {
					if( newClassesArray[i] == 'not-dark' ) {
						angular.element('#header').removeClass('dark');
						angular.element('#header-wrap').addClass('not-dark');
					} else if( newClassesArray[i] == 'dark' ) {
						angular.element('#header-wrap').removeClass('not-dark force-not-dark');
						if( !angular.element('#header').hasClass( newClassesArray[i] ) ) {
							angular.element('#header').addClass( newClassesArray[i] );
						}
					} else if( !angular.element('#header').hasClass( newClassesArray[i] ) ) {
						angular.element('#header').addClass( newClassesArray[i] );
					}
				}
			}
		},

		responsiveMenuClass: function(){
			if( ng_body.hasClass('device-xs') || ng_body.hasClass('device-xxs') || ng_body.hasClass('device-sm') ){
				if( responsiveMenuClasses ) { var newClassesArray = responsiveMenuClasses.split(/ +/); } else { var newClassesArray = ''; }
				var noOfNewClasses = newClassesArray.length;

				if( noOfNewClasses > 0 ) {
					var i = 0;
					for( i=0; i<noOfNewClasses; i++ ) {
						if( newClassesArray[i] == 'not-dark' ) {
							ng_header.removeClass('dark');
							ng_headerWrap.addClass('not-dark');
						} else if( newClassesArray[i] == 'dark' ) {
							ng_headerWrap.removeClass('not-dark force-not-dark');
							if( !ng_header.hasClass( newClassesArray[i] ) ) {
								ng_header.addClass( newClassesArray[i] );
							}
						} else if( !ng_header.hasClass( newClassesArray[i] ) ) {
							ng_header.addClass( newClassesArray[i] );
						}
					}
				}
				SEMICOLON.header.logo();
			}
		},

		removeStickyness: function(){

			if( angular.element('#header').hasClass('sticky-header') ){
				angular.element('body:not(.side-header) #header:not(.no-sticky)').removeClass('sticky-header');
				oldHeaderClasses = angular.element('#header').attr('class');
				angular.element('#header').removeClass().addClass(oldHeaderClasses);
				oldHeaderWrapClasses = angular.element('#header-wrap').attr('class');
				angular.element('#header-wrap').removeClass().addClass(oldHeaderWrapClasses);
				if( !angular.element('#header-wrap').hasClass('force-not-dark') ) { angular.element('#header-wrap').removeClass('not-dark'); }
				// SEMICOLON.slider.swiperSliderMenu();
				// SEMICOLON.slider.revolutionSliderMenu();
			}
			if( ng_pagemenu.hasClass('sticky-page-menu') ){
				angular.element('#page-menu:not(.dots-menu,.no-sticky)').removeClass('sticky-page-menu');
			}
			if( angular.element('#header').hasClass('responsive-sticky-header') ){
				angular.element('body.sticky-responsive-menu #header').removeClass('responsive-sticky-header');
			}
			if( ( ng_body.hasClass('device-xs') || ng_body.hasClass('device-xxs') || ng_body.hasClass('device-sm') ) && ( typeof responsiveMenuClasses === 'undefined' ) ) {
				angular.element('#header').removeClass().addClass(oldHeaderClasses);
				angular.element('#header-wrap').removeClass().addClass(oldHeaderWrapClasses);
				if( !angular.element('#header-wrap').hasClass('force-not-dark') ) { angular.element('#header-wrap').removeClass('not-dark'); }
			}
		}
	};

	SEMICOLON.widget = {
		init: function(){
			SEMICOLON.widget.extras();
		},

		extras: function(){
			angular.element('[data-toggle="tooltip"]').tooltip({container: 'body'});
			angular.element('#primary-menu-trigger,#overlay-menu-close').click(function() {
				angular.element( '#primary-menu > ul, #primary-menu > div > ul' ).toggleClass("show");
				return false;
			});
			angular.element('#page-submenu-trigger').click(function() {
				ng_body.toggleClass('top-search-open', false);
				ng_pagemenu.toggleClass("pagemenu-active");
				return false;
			});
			if( SEMICOLON.isMobile.any() ){
				ng_body.addClass('device-touch');
			}
		}
	};

	SEMICOLON.isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (SEMICOLON.isMobile.Android() || SEMICOLON.isMobile.BlackBerry() || SEMICOLON.isMobile.iOS() || SEMICOLON.isMobile.Opera() || SEMICOLON.isMobile.Windows());
		}
	};

	SEMICOLON.documentOnLoad = {
		init: function() {
			//SEMICOLON.carousel.owlCaptionInit();
			SEMICOLON.portfolio.init();
			SEMICOLON.header.responsiveMenuClass();
			angular.element('body,html').stop(true).animate({scrollTop:0},400);
		}
	};

	SEMICOLON.documentOnResize = {
		init: function() {
			var t = setTimeout( function() {

				SEMICOLON.portfolio.arrange();
			
			}, 500 );
		}
	};

	SEMICOLON.documentOnReady = {
		init: function() {
			SEMICOLON.initialize.init();
			SEMICOLON.header.init();
			// console.log($('#slider').length)
			if ( angular.element('#slider').length > 0 ) { SEMICOLON.slider.init(); }
			if ( angular.element('#oc-team-list').length > 0 ) { SEMICOLON.carousel.initOwlCarousel(); }
			SEMICOLON.widget.init();
			SEMICOLON.documentOnReady.windowScroll();
		},

		windowScroll: function() {
			
			var headerOffset = 0;
			var headerWrapOffset = 0;

			if( angular.element('#header').length > 0 ) { headerOffset = angular.element('#header').offset().top; }
			if( angular.element('#header').length > 0 ) { headerWrapOffset = angular.element('#header-wrap').offset().top; }

			var headerDefinedOffset = angular.element('#header').attr('data-sticky-offset');

			if( typeof headerDefinedOffset !== 'undefined' ) {
				if( headerDefinedOffset == 'full' ) {
					headerWrapOffset = angular.element(window).height();
					var headerOffsetNegative = angular.element('#header').attr('data-sticky-offset-negative');
					if( typeof headerOffsetNegative !== 'undefined' ) { headerWrapOffset = headerWrapOffset - headerOffsetNegative - 1; }
				} else {
					headerWrapOffset = Number(headerDefinedOffset);
				}
			}

			angular.element(window).on( 'scroll', function() {
				SEMICOLON.initialize.goToTopScroll();
				angular.element('body.open-header.close-header-on-scroll').removeClass("side-header-open");
				SEMICOLON.header.stickyMenu( headerWrapOffset );
				SEMICOLON.header.logo();
			});
		}
	};

	// Variables globales
	var ng_window = angular.element(window),
		ng_body = angular.element('body'),
		ng_wrapper = angular.element('#wrapper'),
		ng_header = angular.element('#header'),
		ng_headerWrap = angular.element('#header-wrap'),
		ng_pagemenu = angular.element('#page-menu'),
		oldHeaderClasses = angular.element('#header').attr('class'),
		oldHeaderWrapClasses = angular.element('#header-wrap').attr('class'),
		stickyMenuClasses = angular.element('#header').attr('data-sticky-class'),
		responsiveMenuClasses = angular.element('#header').attr('data-responsive-class'),
		defaultLogo = angular.element('#logo').find('.standard-logo'),
		defaultLogoWidth = defaultLogo.find('img').outerWidth(),
		retinaLogo = angular.element('#logo').find('.retina-logo'),
		defaultLogoImg = defaultLogo.find('img').attr('src'),
		retinaLogoImg = retinaLogo.find('img').attr('src'),
		defaultDarkLogo = defaultLogo.attr('data-dark-logo'),
		retinaDarkLogo = retinaLogo.attr('data-dark-logo'),
		defaultStickyLogo = defaultLogo.attr('data-sticky-logo'),
		retinaStickyLogo = retinaLogo.attr('data-sticky-logo'),
		defaultMobileLogo = defaultLogo.attr('data-mobile-logo'),
		retinaMobileLogo = retinaLogo.attr('data-mobile-logo'),
		ng_pagemenu = angular.element('#page-menu'),
		ng_fullScreenEl = angular.element('.full-screen'),
		ng_slider = angular.element('#slider'),
		ng_goToTopEl = angular.element('#gotoTop'),
		ng_sliderParallaxEl = angular.element('.slider-parallax');

})();