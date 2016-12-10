<?php require_once('vendor/autoload.php');
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    \Stripe\Stripe::setApiKey("sk_test_KZ4HLMMKe5aVerk1ysznOUMt");

    // Get the credit card details submitted by the form
    $token = $_POST['stripeToken'];

    // Create a charge: this will charge the user's card
    try {
        $charge = \Stripe\Charge::create(array(
            "amount" => 2500, // Amount in cents
            "currency" => "usd",
            "source" => $token,
            "description" => "VexVolt"
        ));
    } catch(\Stripe\Error\Card $e) {
        echo('There was an error with your card.');
    }
?>
