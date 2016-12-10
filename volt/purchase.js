var slides = document.getElementsByClassName('slide')
var current = 0

$("#purchase_button").on('click', function() {
    $('#purchase form').addClass('active')
})

function next() {
    current++
    console.log('next: ', current)
    $("#next_button").addClass("disabled")
    $(slides[(current-1)]).addClass("fadeOutLeft")
    $(slides[(current)]).addClass("fadeInLeft").addClass("active")

    $(slides[(current)]).on('webkitAnimationEnd oanimationend msAnimationend animationend',
        function(e) {
            $(slides[(current-1)]).className = "slide"
            $(slides[(current)]).className = "slide active"
        })
    // Fade current slide out and left
    // Fade current+1 slide in and left
    // Add one to progress
    // Check if index = last, if so, set next button to "purchase"
}

function back() {
    current--
    console.log('back: ', current)
    // Fade current slide out and right
    // Fade current-1 slide in and right
    // Subtract one from progress
    // Check if index = 2, if so, blur back button
}

$(slides[current]).find("input").keyup(function () {
    if ($(this).val()) {
        $("#next_button").removeClass("disabled")
    } else {
        $("#next_button").addClass("disabled")
    }
});

Stripe.setPublishableKey("pk_test_W9mLeaacQU2bJZLKllecbOf4")

function stripeResponseHandler(status, response) {
    var $form = $("#payment-form")
    if (response.error) {
        $form.find(".payment-errors").text(response.error.message)
        $form.find(".submit").prop("disabled", false)
    } else {
        var token = response.id
        $form.append($("<input type='hidden' name='stripeToken'>").val(token))
        // $form.get(0).submit()
        $.ajax({
            type: "POST",
            url: "purchase.php",
            data: $form.serializeArray(),
            success: function() {
                // Return success statement to user
                // Post a message to Slack with relevant info
            },
            error: function() {
                // Return error statement
            }
        })
    }
}

$(function() {
    var $form = $("#payment-form")
    $form.submit(function(event) {
        $form.find(".submit").prop("disabled", true)
        Stripe.card.createToken($form, stripeResponseHandler)
        return false
    })
})
