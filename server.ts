import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -----------------------------------------------------
// RESEND CONFIGURATION
// -----------------------------------------------------

const RESEND_API_KEY = process.env.RESEND_API_KEY;

if (!RESEND_API_KEY) {
  console.warn("WARNING: RESEND_API_KEY is missing.");
}

const resend = new Resend(RESEND_API_KEY);

// Email where enquiries should arrive
const ENQUIRY_RECIPIENT = "inventive3tech@gmail.com";

// Temporary storage
const enquiriesStore: any[] = [];

// -----------------------------------------------------
// HEALTH CHECK
// -----------------------------------------------------

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    emailProvider: "Resend",
    recipient: ENQUIRY_RECIPIENT,
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
          "Please fill out Full Name, Email, Service Required, Subject and Message.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address.",
      });
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing.");

      return res.status(500).json({
        success: false,
        error: "Email service is not configured.",
      });
    }

    // -------------------------------------------------
    // CREATE ENQUIRY
    // -------------------------------------------------

    const newEnquiry = {
      id: "ENQ-" + Math.floor(100000 + Math.random() * 900000),

      fullName: String(fullName).trim(),

      companyName: companyName
        ? String(companyName).trim()
        : "Individual",

      email: String(email).trim(),

      phone: phone
        ? String(phone).trim()
        : "Not Provided",

      serviceRequired: String(serviceRequired).trim(),

      subject: String(subject).trim(),

      message: String(message).trim(),

      submittedAt: new Date().toISOString(),
    };

    console.log("");
    console.log("======================================");
    console.log("PROCESSING NEW ENQUIRY");
    console.log("======================================");
    console.log(`ID: ${newEnquiry.id}`);
    console.log(`Customer: ${newEnquiry.fullName}`);
    console.log(`Customer Email: ${newEnquiry.email}`);
    console.log(`Recipient: ${ENQUIRY_RECIPIENT}`);
    console.log("======================================");

    // -------------------------------------------------
    // SEND EMAIL USING RESEND
    // -------------------------------------------------

    const { data, error } = await resend.emails.send({
      // Resend test sender
      from: "Inventive3 Tech <onboarding@resend.dev>",

      // Enquiries arrive here
      to: [ENQUIRY_RECIPIENT],

      // Gmail Reply button replies to customer
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

            <p
              style="
                color:#64748b;
                font-size:13px;
                margin-bottom:5px;
              "
            >
              ENQUIRY ID
            </p>

            <h2 style="margin-top:0;">
              ${newEnquiry.id}
            </h2>

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

            <div
              style="
                background:#f8fafc;
                padding:15px;
                border-radius:8px;
                line-height:1.6;
              "
            >
              ${newEnquiry.message}
            </div>

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
    });

    // -------------------------------------------------
    // RESEND ERROR
    // -------------------------------------------------

    if (error) {
      console.error("");
      console.error("======================================");
      console.error("RESEND EMAIL ERROR");
      console.error("======================================");
      console.error(error);
      console.error("======================================");

      return res.status(500).json({
        success: false,
        error: "Unable to send enquiry email.",
      });
    }

    // Store after successful email
    enquiriesStore.push(newEnquiry);

    // -------------------------------------------------
    // SUCCESS LOG
    // -------------------------------------------------

    console.log("");
    console.log("======================================");
    console.log("EMAIL SENT SUCCESSFULLY");
    console.log("======================================");
    console.log(`Enquiry ID: ${newEnquiry.id}`);
    console.log(`Customer: ${newEnquiry.fullName}`);
    console.log(`Customer Email: ${newEnquiry.email}`);
    console.log(`Service: ${newEnquiry.serviceRequired}`);
    console.log(`Recipient: ${ENQUIRY_RECIPIENT}`);
    console.log(`Resend Email ID: ${data?.id}`);
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
        recipient: ENQUIRY_RECIPIENT,
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
  res.status(200).json({
    success: true,
    count: enquiriesStore.length,
    enquiries: enquiriesStore,
  });
});

// -----------------------------------------------------
// VITE / PRODUCTION
// -----------------------------------------------------

async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite development server...");

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

    app.get("*", (req, res) => {
      res.sendFile(
        path.join(distPath, "index.html")
      );
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("");
    console.log("======================================");
    console.log("Inventive3 Tech Server Started");
    console.log("======================================");
    console.log(`Port: ${PORT}`);
    console.log("Email Provider: Resend");
    console.log(`Enquiry Recipient: ${ENQUIRY_RECIPIENT}`);
    console.log("======================================");
    console.log("");
  });
}

setupVite().catch((error) => {
  console.error("Failed to start server:");
  console.error(error);
  process.exit(1);
});