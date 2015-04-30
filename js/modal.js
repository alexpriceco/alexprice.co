jQuery(document).ready(function($){
	//open popup
	$('.popup-trigger').on('click', function(event){
		event.preventDefault();
		$('.popup').addClass('is-visible');
	});
	
    //open help popup
    $('.popup-trigger-help').on('click', function(event){
		event.preventDefault();
		$('.popup-help').addClass('is-visible');
	});
	
    //open purchase popup
    $('.popup-trigger-purchase').on('click', function(event){
		event.preventDefault();
		$('.popup-purchase').addClass('is-visible');
	});
    
	//close popup
	$('.popup').on('click', function(event){
		if( $(event.target).is('.popup-close') || $(event.target).is('.popup') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
    
	//close help popup
	$('.popup-help').on('click', function(event){
		if( $(event.target).is('.popup-close') || $(event.target).is('.popup-help') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
    
	//close purchase popup
	$('.popup-purchase').on('click', function(event){
		if( $(event.target).is('.popup-close') || $(event.target).is('.popup-purchase') ) {
			event.preventDefault();
			$(this).removeClass('is-visible');
		}
	});
    
	//close popup with escape
	$(document).keyup(function(event){
    	if(event.which=='27'){
    		$('.popup').removeClass('is-visible');
            $('.popup-help').removeClass('is-visible');
            $('.popup-purchase').removeClass('is-visible');
	    }
    });
});