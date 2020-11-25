<?php

if($_POST["submit"]) {
    $recipient="pawelkapusta70@gmail.com";
    $subject="Form from portfolio website";
    $sender=$_POST["FullName"];
    $senderEmail=$_POST["email"];
    $message=$_POST["message"];

    $mailBody="Name: $sender\nEmail: $senderEmail\n\n$message";

    mail($recipient, $subject, $mailBody, "From: $sender <$senderEmail>");

    $thankYou="<p>Thank you! Your message has been sent.</p>";
}

?>