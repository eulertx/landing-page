<?php
/**
 * PHP Mailer Initialize
 * This File shows making an SMTP connection with authentication.
 */

header('Content-Type: application/json');

//SMTP needs accurate times, and the PHP time zone MUST be set
//This should be done in your php.ini, but this is how to do it if you don't have access to that
date_default_timezone_set('Etc/UTC');

// Import PHPMailer Lib
require 'phpmailer/PHPMailerAutoload.php';

// Data post
$post = $_POST;

//Create a new PHPMailer instance
$mail = new PHPMailer;
//Tell PHPMailer to use SMTP
$mail->isSMTP();
//Enable SMTP debugging
// 0 = off (for production use)
// 1 = client messages
// 2 = client and server messages
$mail->SMTPDebug = 2;
//Ask for HTML-friendly debug output
$mail->Debugoutput = 'html';
//Set the hostname of the mail server
$mail->Host = "mail.example.com";
//Set the SMTP port number - likely to be 25, 465 or 587
$mail->Port = 25;
//Whether to use SMTP authentication
$mail->SMTPAuth = true;
//Username to use for SMTP authentication
$mail->Username = "yourname@example.com";
//Password to use for SMTP authentication
$mail->Password = "yourpassword";
//Set who the message is to be sent from
$mail->setFrom($post['your_email'], $post['your_name']);
//Set an alternative reply-to address
$mail->addReplyTo('replyto@example.com', 'First Last');
//Set who the message is to be sent to
$mail->addAddress('whoto@example.com', 'John Doe');
//Set the subject line
$mail->Subject = 'PHPMailer SMTP test';
//Read an HTML message body from an external file, convert referenced images to embedded,
//convert HTML into a basic plain-text alternative body
$mail->msgHTML($post['your_message'], dirname(__FILE__));
//Replace the plain text body with one created manually
$mail->AltBody = 'This is a plain-text message body';
//Attach an image file
$mail->addAttachment('images/phpmailer_mini.png');

//send the message, check for errors
if (!$mail->send()) {
  echo json_encode(array ('message' => "Mailer Error: " . $mail->ErrorInfo));
} else {
  echo json_encode(array ('message' =>"Message sent!"));
}