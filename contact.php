<?php
// CORS headers to allow requests from any domain (adjust if you want to restrict)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
    exit;
}

$name = isset($_POST['name']) ? strip_tags($_POST['name']) : '';
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['subject']) ? strip_tags($_POST['subject']) : 'Contact Form Submission';
$message = isset($_POST['message']) ? strip_tags($_POST['message']) : '';

if (!$name || !$email || !$message) {
    echo json_encode(['success' => false, 'error' => 'Missing required fields.']);
    exit;
}

$to = 'andrewmichaelsrsa@gmail.com';

// Create HTML email template
$htmlMessage = '
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Form Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="background-color: #073366; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Message from Abbaquar - San Dream Centre</h1>
    </div>
    
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
            <h2 style="color: #073366; margin-top: 0; border-bottom: 2px solid #8A4BA3; padding-bottom: 10px;">Contact Details</h2>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                <tr>
                    <td style="padding: 10px 0; color: #666; width: 100px;">Name:</td>
                    <td style="padding: 10px 0; color: #073366; font-weight: bold;">' . htmlspecialchars($name) . '</td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; color: #666;">Email:</td>
                    <td style="padding: 10px 0; color: #073366;">
                        <a href="mailto:' . htmlspecialchars($email) . '" style="color: #8A4BA3; text-decoration: none;">' . htmlspecialchars($email) . '</a>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 10px 0; color: #666;">Subject:</td>
                    <td style="padding: 10px 0; color: #073366;">' . htmlspecialchars($subject) . '</td>
                </tr>
            </table>
            
            <h2 style="color: #073366; border-bottom: 2px solid #8A4BA3; padding-bottom: 10px;">Message</h2>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
                <p style="margin: 0; white-space: pre-wrap;">' . nl2br(htmlspecialchars($message)) . '</p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; padding: 20px; color: #666; font-size: 14px;">
            <p>This email was sent from the contact form on Abbaquar - San Dream Centre website.</p>
        </div>
    </div>
</body>
</html>';

// Create plain text version for email clients that don't support HTML
$plainMessage = "New message from Abbaquar - San Dream Centre website\n\n" .
               "Name: $name\n" .
               "Email: $email\n" .
               "Subject: $subject\n\n" .
               "Message:\n$message";

// Email headers
$boundary = md5(time());
$headers = "From: $name <$email>\r\n" .
           "Reply-To: $email\r\n" .
           "MIME-Version: 1.0\r\n" .
           "Content-Type: multipart/alternative; boundary=\"$boundary\"\r\n";

// Email body
$body = "--$boundary\r\n" .
        "Content-Type: text/plain; charset=UTF-8\r\n" .
        "Content-Transfer-Encoding: base64\r\n\r\n" .
        chunk_split(base64_encode($plainMessage)) . "\r\n" .
        "--$boundary\r\n" .
        "Content-Type: text/html; charset=UTF-8\r\n" .
        "Content-Transfer-Encoding: base64\r\n\r\n" .
        chunk_split(base64_encode($htmlMessage)) . "\r\n" .
        "--$boundary--";

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Failed to send email.']);
} 