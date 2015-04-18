<?php
if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}
$context = "nothing";
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$message = $_POST['message'];
$content = "Nothing here";
$context = $_POST['context'];
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
    $location = "thanks.html?option=volt-question";
}
else if($context == "home") {
    $content = "$name wants to work on a project with you. Here's what they said: \n\n$message \n\nYou can respond to $visitor_email.";
    $location = "thanks.html?option=project";
}
else if($context == "volt-signup") {
    $content = "$name requested that you add $visitor_email to the mailing list.";
    $location = "thanks.html?option=volt-signup";
}
else {
    $content = "$name submitted a form with this content:\n\n$message \n\nYou can respond to $visitor_email.";
    $location = "thanks.html?option=general";
}

$email_from = $visitor_email;
$email_subject = "Voltmeter form submission from $name";
$email_body = "$content\n\n";

$to = "posixoddity@gmail.com";
$headers = "From: $email_from \r\n";
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