(function($){
	var defaults = {
		breakpoint:			600,
		hide_on_scroll:		true,
	};
	mobile_navigation = function(options) {
		var o = $.extend(true, {}, defaults, options);
		var pos = 0;
		$( 'html' ).addClass('mn-close');

		$( ".mn-icon-wrap" ).click(function() {
			pos = $('body').scrollTop();
			if( $('html').hasClass('mn-close' )) {
				$( 'html' ).removeClass('mn-close');
				$( 'html' ).addClass('mn-open' );

				$( '.mn-icon-wrap .icono-cross' ).show();
				$( '.mn-icon-wrap .icono-bars' ).hide();
			} else {
				$( 'html' ).addClass('mn-close');
				$( 'html' ).removeClass('mn-open' );
				$( '.mn-icon' ).removeClass('is-clicked' );

				$( '.mn-icon-wrap .icono-cross' ).hide();
				$( '.mn-icon-wrap .icono-bars' ).show();

				$('body').scrollTop(pos);
			}
		});

		if( o.hide_on_scroll == true ) {
			mn_hide_on_scroll(o);
		}
	}

	function mn_hide_on_scroll(o) {
		var lastscroll = 0;

		$(window).scroll(function(){
			var menu_is_open = $('html').hasClass('mn-open');
			if( menu_is_open == false ) {
				var width = $(window).width();

				if( width < o.breakpoint ) {
					var nav = $('.mn-navigation-wrap');
					var nav_height = nav.height();
					var scrolltop = $(this).scrollTop();
					if(scrolltop > lastscroll){
						if( lastscroll > 50 ) {
							nav.addClass('hidebar');
						}
					} else {
						nav.removeClass('hidebar');
					}
					lastscroll = scrolltop;
				}
			}
		});
	}
})(jQuery);