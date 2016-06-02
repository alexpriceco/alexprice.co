$(function() {

	var form = $('#contact-form');
	var messenger = $('#contact-form-messenger');

	$(form).submit(function(e) {
        // Stop the browser from submitting the form.
		e.preventDefault();
		var formData = $(form).serialize();

		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
            $(messenger).html("Thanks! Can't wait? Reach out to me " +
                "<a href=\"https://twitter.com/alexpriceco\">on Twitter! " +
                "<i class=\"fa fa-twitter\"></i></div></a>");
			$('#name').val('');
			$('#email').val('');
		})
		.fail(function(data) {
			if (data.responseText !== '') {
				$(messenger).text(data.responseText);
			} else {
				$(messenger).text('Oops! An error occured and your message could not be sent.');
			}
		});

	});

});
