const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

const app = express();
const upload = multer(); // Initialize multer without specifying a destination

app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const PORT = 3300;

// Log when the server starts
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Endpoint to send email
app.post("/send-email", upload.none(), async (req, res) => {
  // console.log("Received request to send email:", req.body); // Log the incoming request

  // Check if req.body is empty
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send("No data received.");
  }

  const { email, name, position, company, resume, type } = req.body;

  if (!email || !name || !position || !company || !resume || !type) {
    return res.status(400).send("All fields are required.");
  }

  // Corrected version of the replace function
  const base64Data = resume.replace(/^data:application\/pdf;base64,/, "");

  // Convert the base64 string to a binary buffer
  const pdfBuffer = Buffer.from(base64Data, "base64");

  // Specify the file path and name for the output PDF
  const outputFilePath = "./uploads/" + process.env.FILE_NAME;

  // Write the binary buffer to a PDF file
  fs.writeFile(outputFilePath, pdfBuffer, (err) => {
    if (err) {
      console.error("Error writing PDF file:", err);
    } else {
      console.log("PDF file successfully created at:", outputFilePath);
    }
  });
  try {
    // Create mail options
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject:
        type === "manager"
          ? `Looking for Job Opportunities as ${position} at ${company}`
          : `Seeking Guidance and Referral for ${position} at ${company}`,
      text:
        type === "manager"
          ? `Hello ${name},\n
I hope this email finds you well. My name is Rushabh Mehta, and I recently completed my Master’s in Computer Science at the State University of New York at Binghamton. I am currently seeking full-time opportunities as a ${position} at ${company}.\n
With a solid foundation in JavaScript, React, TypeScript, and CSS, as well as experience with back-end technologies such as Node.js and Spring Boot, I have developed and deployed scalable web applications that improve performance and user engagement. My recent role at Web3fusion LLC allowed me to collaborate with cross-functional teams to build seamless, responsive interfaces, while ensuring optimal performance and scalability.\n
I am proficient in cloud platforms like AWS and Azure, version control with Git, and have worked with databases such as MySQL, PostgreSQL, and MongoDB. I am confident that my experience in both front-end and back-end development, coupled with my drive to continuously improve, would make me a valuable addition to your team.\n
I have attached my resume for your review, and I would love the opportunity to discuss how my background can contribute to the goals of ${company}. Thank you for your time, and I look forward to hearing from you soon.\n
Best regards,\nRushabh Mehta\nhttp://www.therushabhmehta.com/`
          : `Hello ${name},\n
I hope this message finds you well. My name is Rushabh Mehta, and I recently graduated with a Master’s in Computer Science from the State University of New York at Binghamton. I am actively exploring opportunities for a ${position} at ${company}, and I would greatly appreciate your guidance or a referral, should there be a fit.\n
In my recent role as a Software Developer at Web3fusion LLC, I built scalable web applications using React, TypeScript, and Node.js, improving user engagement and security by 30%. I also worked extensively with cloud technologies, leveraging AWS services like Lambda, DynamoDB, and RDS, along with Azure services including Azure SQL and Active Directory, to deploy secure and efficient applications.\n
I would love to contribute my skills in full-stack development, cloud technologies, and database management to help drive ${company}s objectives forward.If you have any advice on how I can best position myself for opportunities at ${company} or can refer me to the right team, I would be truly grateful. I have attached my resume for your reference.\n
Thank you for your time, and I look forward to any guidance or suggestions you might offer.\n
Best regards,\nRushabh Mehta\nhttp://www.therushabhmehta.com/`,
      attachments: [
        {
          filename: process.env.FILE_NAME,
          path: outputFilePath, // Path to the PDF file
        },
      ],
    };

    //     let ManagermailOptions = {
    //       from: process.env.EMAIL,
    //       to: email,
    //       subject: `Looking for Job Opportunities as ${position} at ${company}`,
    //       text: `Hello ${name},\n
    // I hope this email finds you well. My name is Rushabh Mehta, and I recently completed my Master’s in Computer Science at the State University of New York at Binghamton. I am currently seeking full-time opportunities as a ${position} at ${company}.\n
    // With a solid foundation in JavaScript, React, TypeScript, and CSS, as well as experience with back-end technologies such as Node.js and Nest.js, I have developed and deployed scalable web applications that improve performance and user engagement. My recent role at Web3fusion LLC allowed me to collaborate with cross-functional teams to build seamless, responsive interfaces, while ensuring optimal performance and scalability.\n
    // I am proficient in cloud platforms like AWS and Azure, version control with Git, and have worked with databases such as MySQL, PostgreSQL, and MongoDB. I am confident that my experience in both front-end and back-end development, coupled with my drive to continuously improve, would make me a valuable addition to your team.\n
    // I have attached my resume for your review, and I would love the opportunity to discuss how my background can contribute to the goals of ${company}. Thank you for your time, and I look forward to hearing from you soon.\n
    // Best regards,\nRushabh Mehta`,
    //       attachments: [
    //         {
    //           filename: process.env.FILE_NAME,
    //           path: outputFilePath, // Path to the PDF file
    //         },
    //       ],
    //     };

    console.log("Starting email send at:", new Date().toISOString());
    await transporter.sendMail(mailOptions);
    console.log("Email sent at:", new Date().toISOString());
    console.log("Email sent successfully!"); // Log success
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error); // Log error
    res.status(500).send("Failed to send email.");
  }
});
