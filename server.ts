import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------
// RESEND CONFIGURATION
// --------------------------------------------------

if (!process.env.RESEND_API_KEY) {
  console.warn(
    "WARNING: RESEND_API_KEY is not configured. Email sending will not work."
  );
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Enquiries will be delivered here
const ENQUIRY_RECIPIENT = "inventive3tech@gmail.com";

// Temporary in-memory enquiry storage
const enquiriesStore: any[] = [];

// --------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    emailProvider: "Resend",
    timestamp: new Date().toISOString(),
  });
});

// --------------------------------------------------
// POST ENQUIRY
// --------------------------------------------------

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

    // Required fields
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

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address.",
      });
    }

    // Check API key
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing.");

      return res.status(500).json({
        success: false,
        error: "Email service is not configured.",
      });
    }

    // --------------------------------------------------
    // CREATE ENQUIRY
    // --------------------------------------------------

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
    console.log("=====================================");
    console.log("PROCESSING NEW ENQUIRY");
    console.log("=====================================");
    console.log(`Enquiry ID: ${newEnquiry.id}`);
    console.log(`Customer: ${newEnquiry.fullName}`);
    console.log(`Customer Email: ${newEnquiry.email}`);
    console.log(`Sending To: ${ENQUIRY_RECIPIENT}`);
    console.log("=====================================");

    // --------------------------------------------------
    // SEND EMAIL THROUGH RESEND
    // --------------------------------------------------

    const { data, error } = await resend.emails.send({
      // Resend test sender
      from: "Inventive3 Tech <onboarding@resend.dev>",

      // Destination
      to: [ENQUIRY_RECIPIENT],

      // Reply directly to the customer
      replyTo: newEnquiry.email,

      subject: `New Website Enquiry - ${newEnquiry.subject}`,

      html: `
        <!DOCTYPE html>
        <html>
          <body
            style="
              margin: 0;
              padding: 20px;
              background-color: #f4f4f5;
              font-family: Arial, Helvetica, sans-serif;
            "
          >

            <div
              style="
                max-width: 650px;
                margin: 0 auto;
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                overflow: hidden;
              "
            >

              <div
                style="
                  background: #0f172a;
                  color: #ffffff;
                  padding: 25px;
                "
              >
                <h1
                  style="
                    margin: 0;
                    font-size: 24px;
                  "
                >
                  New Customer Enquiry
                </h1>

                <p
                  style="
                    margin: 8px 0 0 0;
                    color: #cbd5e1;
                  "
                >
                  Inventive3 Tech Website
                </p>
              </div>

              <div style="padding: 25px;">

                <p
                  style="
                    font-size: 14px;
                    color: #64748b;
                  "
                >
                  Enquiry ID
                </p>

                <h2
                  style="
                    margin-top: 0;
                    color: #0f172a;
                  "
                >
                  ${newEnquiry.id}
                </h2>

                <hr
                  style="
                    border: 0;
                    border-top: 1px solid #e5e7eb;
                    margin: 25px 0;
                  "
                />

                <h3 style="color: #0f172a;">
                  Customer Details
                </h3>

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

                <hr
                  style="
                    border: 0;
                    border-top: 1px solid #e5e7eb;
                    margin: 25px 0;
                  "
                />

                <h3 style="color: #0f172a;">
                  Enquiry Details
                </h3>

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
                    background: #f8fafc;
                    padding: 15px;
                    border-radius: 8px;
                    line-height: 1.6;
                  "
                >
                  ${newEnquiry.message}
                </div>

                <hr
                  style="
                    border: 0;
                    border-top: 1px solid #e5e7eb;
                    margin: 25px 0;
                  "
                />

                <p
                  style="
                    font-size: 12px;
                    color: #64748b;
                  "
                >
                  Submitted at:
                  ${newEnquiry.submittedAt}
                </p>

              </div>

              <div
                style="
                  background: #f8fafc;
                  padding: 18px 25px;
                  font-size: 12px;
                  color: #64748b;
                "
              >
                This enquiry was submitted through the
                Inventive3 Tech website.
              </div>

            </div>

          </body>
        </html>
      `,
    });

    // --------------------------------------------------
    // RESEND ERROR
    // --------------------------------------------------

    if (error) {
      console.error("");
      console.error("=====================================");
      console.error("RESEND EMAIL ERROR");
      console.error("=====================================");
      console.error(error);
      console.error("=====================================");
      console.error("");

      return res.status(500).json({
        success: false,
        error: "Unable to send enquiry email.",
      });
    }

    // --------------------------------------------------
    // SUCCESS
    // --------------------------------------------------

    enquiriesStore.push(newEnquiry);

    console.log("");
    console.log("=====================================");
    console.log("EMAIL SENT SUCCESSFULLY");
    console.log("=====================================");
    console.log(`Enquiry ID: ${newEnquiry.id}`);
    console.log(`Customer: ${newEnquiry.fullName}`);
    console.log(`Customer Email: ${newEnquiry.email}`);
    console.log(`Service: ${newEnquiry.serviceRequired}`);
    console.log(`Recipient: ${ENQUIRY_RECIPIENT}`);
    console.log(`Resend Email ID: ${data?.id}`);
    console.log("=====================================");
    console.log("");

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
    console.error("=====================================");
    console.error("ENQUIRY PROCESSING ERROR");
    console.error("=====================================");
    console.error(error);
    console.error("=====================================");
    console.error("");

    return res.status(500).json({
      success: false,
      error:
        "Unable to submit your enquiry. Please try again later.",
    });
  }
});

// --------------------------------------------------
// VIEW ENQUIRIES
// --------------------------------------------------

app.get("/api/enquiries", (req, res) => {
  res.status(200).json({
    success: true,
    count: enquiriesStore.length,
    enquiries: enquiriesStore,
  });
});

// --------------------------------------------------
// VITE / PRODUCTION SERVER
// --------------------------------------------------

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

    const distPath = path.join(
      process.cwd(),
      "dist"
    );

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      res.sendFile(
        path.join(
          distPath,
          "index.html"
        )
      );
    });
  }

  app.listen(PORT, "0.0.0.0", () => {

    console.log("");
    console.log("=====================================");
    console.log("Inventive3 Tech Server Started");
    console.log("=====================================");
    console.log(`Port: ${PORT}`);
    console.log("Email Provider: Resend");
    console.log(`Enquiry Recipient: ${ENQUIRY_RECIPIENT}`);
    console.log("=====================================");
    console.log("");

  });
}

setupVite().catch((error) => {
  console.error("Failed to start server:");
  console.error(error);
  process.exit(1);
});