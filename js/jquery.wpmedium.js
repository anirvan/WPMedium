jQuery(window).load(function($) {
	
	if ( jQuery('#show_comments').length > 0 ) {
		jQuery('#show_comments').bind('click', function(e) {
			e.preventDefault();
			jQuery('#comments, #hide_comments').show();
			jQuery('body, html').animate({scrollTop: jQuery('#comments').offset().top}, 200);
			jQuery(this).hide();
		});
	}
	if ( jQuery('#hide_comments').length > 0 ) {
		jQuery('#hide_comments').bind('click', function(e) {
			e.preventDefault();
			jQuery('#comments').hide();
			jQuery(this).hide();
			jQuery('#show_comments').show();
		});
	}
	
	if ( jQuery(window).width() < 760 ) {
		jQuery('.site-menu ul').children('li').hide();
		jQuery('.site-menu ul').prepend('<li id="menu-item-toggle"><a href="#" class="off">Menu »</a></li>');
		jQuery('#menu-item-toggle a').bind('click', function(e) {
			e.preventDefault();
			if ( jQuery(this).hasClass('off') ) {
				jQuery('.site-menu ul').children('li').show();
				jQuery(this).removeClass('off').addClass('on').text('Menu «');
			}
			else {
				jQuery('.site-menu ul').children('li').not(':first').hide();
				jQuery(this).removeClass('on').addClass('off').text('Menu »');
			}
		});
	}

	if ( jQuery('#content > .hentry').length > 1 ) {
		jQuery('#content').masonry();
	}

	jQuery(window).resize(function() {
		if ( jQuery('#content > .hentry').length > 1 ) {
			jQuery('#content').masonry('reload');
		}
	});

	jQuery('#loadmore').click(function(e) {
		e.preventDefault();
		jQuery.ajax({
			type: 'GET',
			url: ajax_object.ajax_url,
			data: {
				action: 'load_posts',
				offset: jQuery('#content .hentry').length
			},
			success: function(response) {
				if ( '' != response ) {
					jQuery('#content').append(response);
					jQuery('#content').masonry('reload');
				}
			},
			beforeSend: function() {
				jQuery('#loadmore').text('...');
			},
			complete: function() {
				jQuery('#loadmore').text(ajax_object.loadmore);
			},
		});
	});
});