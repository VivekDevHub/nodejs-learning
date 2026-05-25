# SMTP Nodemailer

## What is SMTP

- SMTP stands for **Simple Mail Transfer Protocol**
- It is a protocol used to send emails from an application to a mail server
- SMTP helps backend applications communicate with email servers

### Example

- When a user signs up on a website and receives a verification email, the backend uses SMTP to send that email.

---

# What is Nodemailer

- Nodemailer is a Node.js package used to send emails from backend applications
- It simplifies email sending using SMTP services

## Supported Services

- Gmail
- Outlook
- Yahoo
- Mailtrap
- Custom SMTP Servers

---

# Why Nodemailer is Used

- Send OTP Emails
- Email Verification
- Forgot Password Emails
- Welcome Emails
- Notifications
- Contact Form Emails

---

# Installation

```bash
npm install nodemailer
```

---

# Basic Email Flow

```
User Action
    ↓
Backend Server
    ↓
Nodemailer
    ↓
SMTP Server
    ↓
Receiver Email
```

---

# Create Transporter

- A transporter is responsible for connecting the application to the SMTP server.

```jsx
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your_email@gmail.com",
    pass: "your_app_password"
  }
});
```

---

# Send Email

```jsx
const mailOptions = {
  from: "your_email@gmail.com",
  to: "user@gmail.com",
  subject: "Welcome",
  text: "Hello User"
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email Sent:", info.response);
  }
});
```

---

# Full Example

```jsx
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "example@gmail.com",
    pass: "your_app_password"
  }
});

async function sendEmail() {
  try {
    const info = await transporter.sendMail({
      from: "example@gmail.com",
      to: "user@gmail.com",
      subject: "Test Email",
      text: "SMTP and Nodemailer working successfully"
    });

    console.log(info);
  } catch (error) {
    console.log(error);
  }
}

sendEmail();
```

---

# Gmail SMTP Setup

## Steps

1. Enable **2-Step Verification** in Gmail
2. Generate an **App Password**
3. Use the App Password instead of your Gmail password

---

# Common SMTP Ports

| Port | Usage |
| --- | --- |
| 587 | TLS (Recommended) |
| 465 | SSL |
| 25 | Default Old SMTP Port |

---

# HTML Email Example

```jsx
await transporter.sendMail({
  from: "example@gmail.com",
  to: "user@gmail.com",
  subject: "Welcome",
  html: "<h1>Hello User</h1><p>Welcome to our website</p>"
});
```

---

# Attachments Example

```jsx
await transporter.sendMail({
  from: "example@gmail.com",
  to: "user@gmail.com",
  subject: "File",
  text: "Attachment added",
  attachments: [
    {
      filename: "resume.pdf",
      path: "./resume.pdf"
    }
  ]
});
```

---

# Environment Variables

- Use `.env` files to keep credentials secure.

## .env File

```
EMAIL_USER=example@gmail.com
EMAIL_PASS=your_app_password
```

## Using dotenv

```jsx
require("dotenv").config();

auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS
}
```

---

# Advantages of Nodemailer

- Easy to use
- Fast email sending
- Supports HTML emails
- Supports attachments
- Secure with SMTP authentication

---

# Common Errors

| Error | Reason |
| --- | --- |
| Invalid Login | Wrong email or app password |
| Connection Timeout | SMTP server issue |
| ECONNREFUSED | Wrong host or port |
| Missing Credentials | Email or password missing |

---

# Best Practices

- Never expose email passwords
- Use environment variables
- Use App Passwords for Gmail
- Validate user email before sending
- Use `try-catch` for error handling

---

# Interview Questions

## What is SMTP?

- SMTP is a protocol used to send emails over the internet.

---

## What is Nodemailer?

- Nodemailer is a Node.js library used for sending emails.

---

## Why use an App Password instead of a Gmail password?

- Gmail blocks less secure login methods for security reasons.

---

## What is a transporter in Nodemailer?

- A transporter creates a connection between the application and the SMTP server.

---

## Difference between `text` and `html` in emails

### text

- Sends plain text messages

### html

- Sends styled email content using HTML