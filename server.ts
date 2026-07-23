import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Parse JSON request bodies
app.use(express.json());

// Parse form-encoded request bodies if needed
app.use(express.urlencoded({ extended: true }));

// Temporary in-memory enquiry storage.
// Note: this resets whenever the server restarts.
const enquiriesStore: any[] = [];

// -----------------------------------------------------
// EMAIL CONFIGURATION
// -----------------------------------------------------

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// -----------------------------------------------------
// HEALTH CHECK
// -----------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// -----------------------------------------------------
// POST ENQUIRY
// -----------------------------------------------------

app.post("/api/enquiry", async (req, res) => {
  try {
    const {
      fullName,
      companyName,
      email,
      phone,
      serviceRequired,
      subject,
      message,
    } = req.body;

    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (
      !fullName ||
      !email ||
      !serviceRequired ||
      !subject ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Missing required fields. Please fill out Full Name, Email, Service Required, Subject, and Message.",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address format.",
      });
    }

    // -------------------------------------------------
    // CREATE ENQUIRY
    // -------------------------------------------------

    const newEnquiry = {
      id: "ENQ-" + Math.floor(100000 + Math.random() * 900000),

      fullName: fullName.trim(),

      companyName: companyName?.trim() || "Individual",

      email: email.trim(),

      phone: phone?.trim() || "Not Provided",

      serviceRequired,

      subject: subject.trim(),

      message: message.trim(),

      submittedAt: new Date().toISOString(),
    };

    // -------------------------------------------------
    // SEND EMAIL
    // -------------------------------------------------

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error(
        "EMAIL_USER or EMAIL_PASS is missing from environment variables."
      );

      return res.status(500).json({
        success: false,
        error: "Email service is not configured correctly.",
      });
    }

    const mailOptions = {
      from: `"Inventive3 Tech Website" <${process.env.EMAIL_USER}>`,

      // Your company/admin Gmail
      to: process.env.EMAIL_USER,

      // Clicking Reply will reply to the customer
      replyTo: newEnquiry.email,

      subject: `New Website Enquiry - ${newEnquiry.subject}`,

      text: `
NEW CUSTOMER ENQUIRY
----------------------------------------

Enquiry ID:
${newEnquiry.id}

Customer Name:
${newEnquiry.fullName}

Company:
${newEnquiry.companyName}

Customer Email:
${newEnquiry.email}

Phone:
${newEnquiry.phone}

Service Required:
${newEnquiry.serviceRequired}

Subject:
${newEnquiry.subject}

Message:
${newEnquiry.message}

----------------------------------------

Submitted At:
${newEnquiry.submittedAt}

This enquiry was submitted through the Inventive3 Tech website.
      `,

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: auto;
            border: 1px solid #ddd;
            border-radius: 10px;
            overflow: hidden;
          "
        >

          <div
            style="
              background: #0f172a;
              color: white;
              padding: 25px;
            "
          >
            <h1 style="margin:0;">
              New Customer Enquiry
            </h1>

            <p style="margin-bottom:0;">
              Inventive3 Tech Website
            </p>
          </div>

          <div style="padding:25px;">

            <h3>Enquiry ID</h3>

            <p>
              ${newEnquiry.id}
            </p>

            <hr />

            <h3>Customer Details</h3>

            <p>
              <strong>Name:</strong>
              ${newEnquiry.fullName}
            </p>

            <p>
              <strong>Company:</strong>
              ${newEnquiry.companyName}
            </p>

            <p>
              <strong>Email:</strong>
              ${newEnquiry.email}
            </p>

            <p>
              <strong>Phone:</strong>
              ${newEnquiry.phone}
            </p>

            <hr />

            <h3>Enquiry Details</h3>

            <p>
              <strong>Service Required:</strong>
              ${newEnquiry.serviceRequired}
            </p>

            <p>
              <strong>Subject:</strong>
              ${newEnquiry.subject}
            </p>

            <p>
              <strong>Message:</strong>
            </p>

            <p>
              ${newEnquiry.message}
            </p>

            <hr />

            <p
              style="
                color:#666;
                font-size:12px;
              "
            >
              Submitted:
              ${newEnquiry.submittedAt}
            </p>

          </div>

        </div>
      `,
    };

    // Actually send email
    const emailInfo = await transporter.sendMail(mailOptions);

    // Store only after email succeeds
    enquiriesStore.push(newEnquiry);

    // -------------------------------------------------
    // SERVER LOG
    // -------------------------------------------------

    console.log("");
    console.log("======================================");
    console.log("INVENTIVE3 TECH - NEW ENQUIRY");
    console.log("======================================");

    console.log(`Enquiry ID: ${newEnquiry.id}`);
    console.log(`Name: ${newEnquiry.fullName}`);
    console.log(`Email: ${newEnquiry.email}`);
    console.log(`Phone: ${newEnquiry.phone}`);
    console.log(`Service: ${newEnquiry.serviceRequired}`);
    console.log(`Subject: ${newEnquiry.subject}`);

    console.log("--------------------------------------");

    console.log("Email sent successfully.");
    console.log(`Message ID: ${emailInfo.messageId}`);

    console.log("======================================");
    console.log("");

    // -------------------------------------------------
    // SUCCESS RESPONSE
    // -------------------------------------------------

    return res.status(200).json({
      success: true,

      message:
        "Your enquiry has been successfully submitted to Inventive3 Tech.",

      enquiryId: newEnquiry.id,

      data: {
        recipient: process.env.EMAIL_USER,
        estimatedResponseTime: "24 business hours",
      },
    });
  } catch (error: any) {
    console.error("");
    console.error("======================================");
    console.error("ENQUIRY PROCESSING ERROR");
    console.error("======================================");

    console.error(error);

    console.error("======================================");
    console.error("");

    return res.status(500).json({
      success: false,

      error:
        "Unable to submit your enquiry at the moment. Please try again later.",
    });
  }
});

// -----------------------------------------------------
// VIEW ENQUIRIES
// -----------------------------------------------------

app.get("/api/enquiries", (req, res) => {
  res.json({
    success: true,
    count: enquiriesStore.length,
    enquiries: enquiriesStore,
  });
});

// -----------------------------------------------------
// VITE
// -----------------------------------------------------

async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite server in development mode...");

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },

      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    console.log("Serving production static assets...");

    const distPath = path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("");
    console.log("======================================");
    console.log("Inventive3 Tech Server Started");
    console.log("======================================");

    console.log(`Server: http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/health`);

    console.log("======================================");
    console.log("");
  });
}

setupVite();