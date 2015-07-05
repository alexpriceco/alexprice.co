<?php

$context = "nothing";
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$message = $_POST['message'];
$home = $_POST['where'];
$context = $_POST['context'];

$content = "Nothing here";
$location = "alexprice.co";

//Validate first
if(empty($name)||empty($visitor_email)) 
{
    echo "Name and email are mandatory!";
    exit;
}

if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}

//Figure out where to send it 
if($context == "volt-question") {
    $content = "$name had a question about the site/product: \n\n$message \n\nYou can respond to $visitor_email.";
    $location = "../html/thanks.html?option=volt-question";
}
else if($context == "home") {
    $content = "$name wants to work on a project with you. Here's what they said: \n\n$message \n\nYou can respond to $visitor_email.";
    $location = "../html/thanks.html?option=project";
}
else if($context == "edu") {
    $content = "$name is an educator: \n\n$message \n\nYou can respond to $visitor_email.";
    $location = "../html/thanks.html?option=volt-edu";
}
else if($context == "bulk") {
    $content = "$name inquired regarding a bulk order: \n\n$message \n\nYou can respond to $visitor_email.";
    $location = "../html/thanks.html?option=volt-bulk";
}
else if($context == "volt-signup") {
    $content = "$name requested that you add $visitor_email to the mailing list.";
    $location = "../html/thanks.html?option=volt-signup";
}
else if($context == "volt-purchase") {
    $content = "$name at $visitor_email submitted an order!";
    $location = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WKQ9SYMUAAEVA";
}
else if($context == "chatter-home") {
    $content = "$name ($visitor_email) from $home wants you to work on their project.\n\n$message";
    $location = "../html/thanks.html?option=chatter";
}
else {
    $content = "$name submitted a form with this content:\n\n$message \n\nYou can respond to $visitor_email.";
    $location = "../html/thanks.html?option=general";
}

$email_subject = "Form submission from $name";
$email_body = "$content\n\n";

$to = "posixoddity@gmail.com";
$headers = "From: $visitor_email \r\n";
$headers .= "Reply-To: $visitor_email \r\n";
mail($to,$email_subject,$email_body,$headers);
header("Location: $location");


// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    { return true; }
  else
    { return false; }
}
   
?> 