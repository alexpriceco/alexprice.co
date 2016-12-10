function postMessageToSlack(name, message) {
    var url = "https://hooks.slack.com/services/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"
    var text = "("+ name +") "+ message
    $.ajax({
        data: 'payload=' + JSON.stringify({
            "text": text
        }),
        dataType: 'json',
        processData: false,
        type: 'POST',
        url: url
    })
}


var name_submitted = false;

$('#next-button').click(function(event) {
    event.preventDefault();
    var name = $('#name').val();

    if(name.length > 0) {
        $('#name').hide();
        $('#identifier').show();
        $('#next-button').html('Get in touch');
        $('#contact h2').html('Nice to meet you '+name+'! Throw your email, ' +
            'phone number, or Twitter handle below, and I\'ll get in touch ' +
            'with you.');
        if(name_submitted == true) {
            var identifier = $('#identifier').val();
            if(identifier.length > 0) {
                // $('#name').hide();
                // $('#identifier').show();
                var message = "Hi there! Reach me at "+identifier+'!';
                postMessageToSlack(name, message);
                $('#contact form, #contact .body-copy').hide();
                $('#contact h1').html('I\'ll be in touch.');
                $('#contact h2').html('In the meantime, reach out to me on ' +
                    '<a href="https://twitter.com/alexpriceco">Twitter</a>, ' +
                    'browse my <a href="https://instagram.com/alexpriceco">' +
                    'Instagram</a>, or check out '+
                    '<a href="https://media.giphy.com/media/InketCaEF5OOQ/giphy.gif">'+
                    'this rad gif</a>.');
            } else {
                alert('I don\'t know how to get in touch with you! Enter your email, ' +
                    'phone number, or Twitter handle.')
            }
        }
        name_submitted = true;
    } else {
        alert('You\'ve gotta tell me who you are, first!')
    }
});

$('#submit-button').click(function(event) {
    event.preventDefault();

});
