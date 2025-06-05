/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {
  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.

  var navbarHeight = 120;

  var Sage = {
    // All pages
    'common': {
      init: function() {
        window.lazySizesConfig = window.lazySizesConfig || {};
        // window.lazySizesConfig.lazyClass = 'lazy';
        // lazySizesConfig.srcAttr = 'data-original';
        lazySizesConfig.loadMode = 1;

// @start cart drawer
        const cartOpenClass = 'cart-open';
        $(document).on('cart-open', function(e) {
          e.preventDefault();
          if($(document.body).hasClass(cartOpenClass)) {
            $(document.body).removeClass(cartOpenClass);
          } else {
            $(document.body).addClass(cartOpenClass);
          }
        });

        $(document).on('keydown', function(e) {
          if(27 === e.which && $(document.body).hasClass(cartOpenClass)) {
            $(document).trigger('cart-open');
          }
        });

        $(document).on('click', '[data-toggle="cart"]', function(e) {
          e.preventDefault();
          $(document).trigger('cart-open');
        });

        var cartCloseTimeout;
        $(document).on('added_to_cart', function() {
          clearTimeout(cartCloseTimeout);
          const cartDelay = parseInt($('.bb-cart').attr('data-delay'));
          if(!$(document.body).hasClass('cart-open') && !isNaN(cartDelay)) {
            $(document).trigger('cart-open');
          }
          if(!isNaN(cartDelay) && cartDelay > 0) {
            cartCloseTimeout = setTimeout(function() {
              if($(document.body).hasClass('cart-open')) {
                $(document).trigger('cart-open');
              }
            }, cartDelay);
          }
        });
// @end cart drawer

// @start AJAX update mini cart
        var is_blocked = function( $node ) {
          return $node.is( '.processing' ) || $node.parents( '.processing' ).length;
        };
        var block = function( $node ) {
          if ( ! is_blocked( $node ) ) {
            $node.addClass( 'processing' ).block( {
              message: null,
              overlayCSS: {
                background: '#fff',
                opacity: 0.6
              }
            } );
          }
        };
        var unblock = function( $node ) {
          $node.removeClass( 'processing' ).unblock();
        };
        var show_notice = function( html_element, $target ) {
          if ( ! $target ) {
            $target = $( '.woocommerce-notices-wrapper:first' ) || $( '.cart-empty' ).closest( '.woocommerce' ) || $( '.woocommerce-cart-form' );
          }
          $target.prepend( html_element );
        };

        var update_wc_div = function( html_str, preserve_notices ) {
          var $html          = $.parseHTML( html_str );
          var $new_mini_cart = $( '.widget_shopping_cart_content', $html );
          var $notices       = $( '.woocommerce-error, .woocommerce-message, .woocommerce-info', $html );

          // No mini cart, cannot do this.
          if ( $( '.widget_shopping_cart_content' ).length === 0 ) {
            window.location.reload();
            return;
          }

          // Remove errors
          if ( ! preserve_notices ) {
            $( '.woocommerce-error, .woocommerce-message, .woocommerce-info' ).remove();
          }

          if ( $new_mini_cart.length === 0 ) {
            // If the checkout is also displayed on this page, trigger reload instead.
            if ( $( '.woocommerce-checkout' ).length ) {
              window.location.reload();
              return;
            }

            // Display errors
            if ( $notices.length > 0 ) {
              show_notice( $notices );
            }
          } else {
            // If the checkout is also displayed on this page, trigger update event.
            if ( $( '.woocommerce-checkout' ).length ) {
              $( document.body ).trigger( 'update_checkout' );
            }

            // $( '.widget_shopping_cart_content' ).replaceWith( $new_mini_cart );

            if ( $notices.length > 0 ) {
              // show_notice( $notices );
            }
            // $( document.body ).trigger( 'updated_cart_totals' );

            // update_cart_totals_div( $new_totals );
          }

          $( document.body ).trigger( 'updated_wc_div' );
        };

        $(document.body).on('wc_fragments_refreshed', function(e) {
          unblock($('.woocommerce-mini-cart'));
        });

        $(document.body).on('click', '[data-qty]', function(e) {
          e.preventDefault();

          var $inputField = $(this).closest('.quantity').find('input.qty');
          var $plusBtn    = $(this).closest('.quantity').find('[data-qty="plus"]');
          var $minusBtn   = $(this).closest('.quantity').find('[data-qty="minus"]');

          var inputMin    = parseInt($inputField.attr('min'));
          var inputMax    = parseInt($inputField.attr('max'));
          var currentVal  = parseInt($inputField.val());

          if('plus' === $(this).attr('data-qty')) {
            if(!isNaN(currentVal)) {
              $inputField.val(currentVal + 1).trigger('change');
              if(inputMax === (currentVal + 1)) {
                $(this).prop('disabled', true);
              }
            } else {
              $inputField.val(0).trigger('change');
            }
            if((currentVal + 1) > inputMin) {
              $minusBtn.prop('disabled', false);
            }
          } else {
            if(!isNaN(currentVal) && currentVal > 0) {
              $inputField.val(currentVal - 1).trigger('change');
              if(inputMin === (currentVal - 1)) {
                $(this).prop('disabled', true);
              }
            } else {
              $inputField.val(0).trigger('change');
            }
            if((currentVal - 1) < inputMax) {
              $plusBtn.prop('disabled', false);
            }
          }
        });


        var miniCartQtyUpdate = _.debounce(function() {
          var $form       = $('.woocommerce-mini-cart');
          block($form);
          var data = {
            'action':                      'update_mini_cart_totals',
            'update_cart':                 'Update Cart',
            '_wp_http_referer':            $('[name="_wp_http_referer"]').attr('value'),
            'woocommerce-mini-cart-nonce': $('[name="woocommerce-mini-cart-nonce"]').attr('value'),
          };
          $('.woocommerce-mini-cart input.qty').each(function() {
            data[$(this).attr('name')] = $(this).val();
          });

          $.ajax( {
            type:     'POST',
            url:      theme_vars.ajax_url,
            data:     $.param(data),
            dataType: 'html',
            success:  function(data, textStatus, jqXHR) {
// console.log(response);
              update_wc_div(data, false);
            },
            complete: function(jqXHR, textStatus) {
              // unblock($form);
            }
          });
        }, 300);
        $(document.body).on('change', '.woocommerce-mini-cart input.qty', miniCartQtyUpdate);
// @end AJAX update mini cart

// @start video click
        $(document).on('click', '.btn-vid', function(e) {
          e.preventDefault();
        });

        $('.btn-vid').lightGallery({
          selector: 'this',
          counter: false,
          autoplayFirstVideo: true,
          youtubePlayerParams: {
            autoplay: 1,
          },
        });
// @end video click

// @start sticky footer
        $('.footer-sticky').affix({
          offset: {
            top: navbarHeight,
            bottom: function() {
              return (this.bottom = $('.site-footer').outerHeight(true));
            }
          }
        });
// @end sticky footer

// @start pinterest
        $(document).on('click', '.btn-pinterest[data-href], .pinterest-image-anchor, .entry-single > header .pin-trigger', function(e) {
          var theLink = 'undefined' === typeof $(this).attr('data-href') ? $(this).attr('href') : $(this).attr('data-href');
          e.preventDefault();
          window.open(theLink, '', 'menubar=no, toolbar=no, resizable=yes, scrollbars=yes, height=600, width=600');
        });
// @end pinterest

// @start product carousel/slider/swiper
        var productSwipers = [];
        $('.products-bb.slide .products-bb-container').each(function() {
          var $prevEl      = $(this).closest('.products-bb.slide').find('.products-bb-prev');
          var $nextEl      = $(this).closest('.products-bb.slide').find('.products-bb-next');
          var slideCountMd = $(this).closest('.products-bb.slide').hasClass('content-slider') ? 2 : 4;

          var currentSwiper = new Swiper(this, {
            // loop: true,
            keyboard: {
              enabled: true,
            },
            preloadImages: false,
            // lazy: {
            //   loadPrevNext:   true,
              // elementClass:   'swiper-lazy',
              // loadingClass:   'swiper-lazy-loading',
              // loadedClass:    'swiper-lazy-loaded',
              // preloaderClass: 'swiper-lazy-preloader',

              // elementClass:   'product-lzy',
              // loadingClass:   'product-lzy-loading',
              // loadedClass:    'product-lzy-loaded',
              // preloaderClass: 'product-lzy-preloader',
            // },
            // watchSlidesVisibility: true,
            slidesPerView: 2.5,
            breakpointsInverse: true,
            breakpoints: {
              576: {
                slidesPerView: 3.5,
              },
              768: {
                slidesPerView: slideCountMd,
              },
            },
            // spaceBetween: 14,
            navigation: {
              nextEl: $nextEl,
              prevEl: $prevEl,
            },
            // containerModifierClass:    'swiper-container-',
            // wrapperClass:              'swiper-wrapper',
            // slideClass:                'swiper-slide',
            // slideClass:                'swiper-slide',
            // slideBlankClass:           'swiper-slide-invisible-blank',
            // slideActiveClass:          'swiper-slide-active',
            // slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            // slideVisibleClass:         'swiper-slide-visible',
            // slideDuplicateClass:       'swiper-slide-duplicate',
            // slideNextClass:            'swiper-slide-next',
            // slideDuplicateNextClass:   'swiper-slide-duplicate-next',
            // slidePrevClass:            'swiper-slide-prev',
            // slideDuplicatePrevClass:   'swiper-slide-duplicate-prev',
            containerModifierClass:    'products-bb-container-',
            wrapperClass:              'products-bb-row',
            slideClass:                'products-bb-col',
            slideBlankClass:           'products-bb-col-invisible-blank',
            slideActiveClass:          'products-bb-col-active',
            slideDuplicateActiveClass: 'products-bb-col-duplicate-active',
            slideVisibleClass:         'products-bb-col-visible',
            slideDuplicateClass:       'products-bb-col-duplicate',
            slideNextClass:            'products-bb-col-next',
            slideDuplicateNextClass:   'products-bb-col-duplicate-next',
            slidePrevClass:            'products-bb-col-prev',
            slideDuplicatePrevClass:   'products-bb-col-duplicate-prev',
          });
          productSwipers.push($(currentSwiper).get(0));
        });
// @end product carousel/slider/swiper

// @start search input parity
        $(document).on('change', '.navbar-search .search-field', function(e) {
          $('.modal-navbar .search-field').val($(this).val());
        });
        $(document).on('change', '.modal-navbar .search-field', function(e) {
          $('.navbar-search .search-field').val($(this).val());
        });
// @end search input parity

// @start focus search field on reveal
        $(document).on('shown.bs.collapse', '.navbar-search', function(e) {
          $(this).find('.search-field').trigger('focus');
        });
// @end focus search field on reveal

// @start close search on escape
        $(document).on('keydown', function(e) {
          var $searchCollapse = $('.navbar-search.collapse.show');
          if(27 === e.which) {
            $searchCollapse.collapse('hide');
          }
        });
// @end close search on escape


// @start popup
        var $thePopup = $('.popup');
        var modalCookie = 'custom' === $thePopup.attr('data-type') ? 'custom_modal_bb' : 'modal_bb';
        $thePopup.on('shown.bs.modal', function () {
          $thePopup.find('input[type="email"]').trigger('focus');
        });
        if($thePopup.length > 0) {
          if('undefined' === typeof Cookies.get(modalCookie)) {
            Cookies.set(modalCookie, 'y', { expires: 90 });
          }
          if('y' === Cookies.get(modalCookie) && !$('body').hasClass('page-template-page-newsletter')) {
            var popupDelay    = parseInt($thePopup.attr('data-delay'));
            var popupRemember = parseInt($thePopup.attr('data-remember'));
            setTimeout(function() {
              $thePopup.modal('show');
            }, popupDelay);
            $(document).on('hide.bs.modal', function() {
              Cookies.set(modalCookie, 'n', {
                expires: popupRemember
              });
            });
          }
        }
// @end popup
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    'tax_product_cat_bb': {
      init: function() {
// @start product category nav dropdown positioning
        var lazyLayout = _.debounce(function() {
          $('.dropdown-menu.depth-1').each(function() {
            var currentTop  = parseInt($(this).css('top'));
            if('undefined' === typeof $(this).attr('data-top')) {
              $(this).attr('data-top', currentTop);
            }
            var navbarTop   = $(this).closest('.navbar-nav').offset().top;
            var navItemTop  = $(this).closest('.nav-item').offset().top;
            if(navItemTop > navbarTop) {
              $(this).css('top', parseInt($(this).attr('data-top')) + (navItemTop - navbarTop) + 'px');
            }
          });
        }, 300);
        lazyLayout();
        $(window).resize(lazyLayout);
// @end product category nav dropdown positioning
      }
    },
    'single_product': {
      init: function() {
// @start change ATC button text on success
        $(document.body).on('wc_cart_button_updated', function(e, btn) {
          $(btn).text('Added to cart');
        });
// @end change ATC button text on success
// @start AJAX add to cart on single
        $(document.body).on('click', '.single_add_to_cart_button', function(e) {
          const $thisButton = $(this);
          if(typeof wc_add_to_cart_params === 'undefined' || $thisButton.is('.disabled') || $thisButton.closest('form').hasClass('grouped_form')) {
            return;
          }

          e.preventDefault();

          const $variationForm = $thisButton.closest('form.variations_form');
          const $productDiv    = $thisButton.closest('.product');
          const data           = {};

          $thisButton.removeClass('added');
          $thisButton.addClass('loading');

          if($productDiv.hasClass('product-type-simple')) {
            data.product_id     = $thisButton.attr('value');
            data.quantity       = $productDiv.find('input[name=quantity]').val();
          } else if($productDiv.hasClass('product-type-variable')) {
            data.product_id     = $variationForm.find('input[name=variation_id]').val();
            data.quantity       = $variationForm.find('input[name=quantity]').val();
          }

          $(document.body).trigger('adding_to_cart', [$thisButton, data]);

          $.post(wc_add_to_cart_params.wc_ajax_url.toString().replace('%%endpoint%%', 'add_to_cart'), data, function(response) {
            if(!response) {
              return;
            }
            if(response.error && response.product_url) {
              window.location = response.product_url;
              return;
            }
            if(wc_add_to_cart_params.cart_redirect_after_add === 'yes') {
              window.location = wc_add_to_cart_params.cart_url;
              return;
            }
            $(document.body).trigger('added_to_cart', [response.fragments, response.cart_hash, $thisButton] );
          });
        });
// @end AJAX add to cart on single
// @start product swiper
        var productSwiper = new Swiper('.prod-gallery-main .swiper-container', {
          init: false,
          loop: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 10,
          loopedSlides: parseInt(document.querySelector('.prod-gallery-main').getAttribute('data-count')),
          slideToClickedSlide: true,
        });
        productSwiper.on('init', function(swiper) {
          $(document).on('click', '.prod-gallery-thumb-image', function(e) {
            const index = parseInt($(e.target).closest('.prod-gallery-thumb').index());
            productSwiper.slideToLoop(index);
          });          
        });
        productSwiper.init();
// @end product swiper
      }
    },
    'page_template_front_page': {
      init: function() {
        if(window.matchMedia('(min-width: 992px)').matches) {
          var controller   = new ScrollMagic.Controller();
          var navbarBrand  = '.navbar-container > .navbar-brand';
          var $navbarBrand = $('.navbar-container > .navbar-brand');
          var tween        = new TimelineMax();        
          tween.add([
            TweenMax.from(navbarBrand, 1, {
              y: window.matchMedia('(min-width: 1200px)').matches ? '+=14px' : '+=21px',
              scale: window.matchMedia('(min-width: 1200px)').matches ? '2.15' : '1.7',
            }),
          ]);
          var scene        = new ScrollMagic.Scene({
            duration: window.matchMedia('(min-width: 1200px)').matches ? (navbarHeight * 5) : (navbarHeight * 4),
          })
          .setTween(tween)
          .addTo(controller);

          scene.on('update', function(event) {
            $navbarBrand.addClass('active');
          });
        }
// scene.on('change update progress start end enter leave', function(event) {
//   console.log('Event fired! (' + event.type + ')');
// });
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'page_template_page_newsletter': {
      init: function() {
// @start redirect after newsletter subscribe
        var newsRedirect      = $('.page-content .popup-container').attr('data-redirect');
        var newsRedirectDelay = parseInt($('.page-content .popup-container').attr('data-delay'));
        var newsFormId        = parseInt($('.page-content .popup-container').attr('data-form'));
        $(document).on('gform_confirmation_loaded', function(event, formId) {
          if(newsFormId == formId) {
            Cookies.set(modalCookie, 'n', { expires: 15 });
            if('undefined' !== typeof(newsRedirect) && newsRedirectDelay > 0) {
              setTimeout(function() {
                window.location = newsRedirect;
              }, newsRedirectDelay);
            }
          }
        });
// @end redirect after newsletter subscribe
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

  console.log('ready');

  $('img').each(function() {
    console.log('img');
    var $img = $(this);
    var alt = $img.attr('alt');
    if (!alt || alt.trim() === '') {
      var src = $img.attr('src') || '';
      var fileName = src.split('/').pop().split('?')[0].split('#')[0];
      $img.attr('alt', fileName);
    }
  });

})(jQuery); // Fully reference jQuery after this point.
