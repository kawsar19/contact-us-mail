// index.js

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Body parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define a route for the contact form submission
app.post("/contact", (req, res) => {
  // Get form data from request body
  const { name, email, phone, subject, message } = req.body;

  // Create a nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "kawsarbinjahangir@gmail.com",
      pass: "mswj jvgp ddes hzns",
    },
  });

  // Setup email data
  let mailOptions = {
    from: `"${name}" <${email}>`,
    to: "kawsarbinjahangir@gmail.com", // Recipient email address
    subject: subject || "New message from contact form", // Use provided subject or default
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully");
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
