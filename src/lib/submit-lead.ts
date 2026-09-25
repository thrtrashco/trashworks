import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  name:        z.string().min(1),
  email:       z.string().email(),
  company:     z.string().optional().default(""),
  phone:       z.string().min(5),
  countryCode: z.string().optional().default("+91"),
  service:     z.string().min(1),
  message:     z.string().min(1),
  source:      z.enum(["contact_page", "cta_modal"]).default("contact_page"),
});

export type LeadPayload = z.infer<typeof LeadSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const uri = process.env["MONGODB_URI"];

    // ── 1. Save to MongoDB ──────────────────────────────────────────
    let insertedId = "unknown";

    if (uri) {
      const { MongoClient, ServerApiVersion } = await import("mongodb");

      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        connectTimeoutMS: 8000,
        serverSelectionTimeoutMS: 8000,
        socketTimeoutMS: 8000,
      });

      await client.connect();

      try {
        const db    = client.db("thetrashco");
        const leads = db.collection("leads");

        const result = await leads.insertOne({
          name:      data.name,
          email:     data.email,
          company:   data.company,
          phone:     `${data.countryCode} ${data.phone}`.trim(),
          service:   data.service,
          message:   data.message,
          source:    data.source,
          createdAt: new Date(),
        });

        insertedId = result.insertedId.toString();
        console.log("[submitLead] MongoDB inserted:", insertedId);
      } finally {
        await client.close();
      }
    } else {
      console.warn("[submitLead] MONGODB_URI not set — skipping DB save.");
    }

    // ── 2. Send email via Resend ────────────────────────────────────
    try {
      const apiKey = process.env["RESEND_API_KEY"];

      if (!apiKey) {
        console.warn("[submitLead] RESEND_API_KEY not set — skipping email.");
      } else {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);

        const sourceLabel = data.source === "cta_modal" ? "Get Started modal" : "Contact page";
        const fullPhone   = `${data.countryCode} ${data.phone}`.trim();

        await resend.emails.send({
          from:    "The Trash Co. <onboarding@resend.dev>",
          to:      "hello@trashworks.in",
          replyTo: data.email,
          subject: `New enquiry from ${data.name} — ${data.service}`,
          html: `
            <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
              <div style="background:#0f0f0f;padding:24px 28px;border-radius:8px 8px 0 0">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#7ec96a">New Lead · ${sourceLabel}</p>
                <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#f5f5f0">${data.name}</h1>
                <p style="margin:4px 0 0;font-size:14px;color:#a3a89a">${data.service}</p>
              </div>
              <div style="background:#f9f9f7;padding:24px 28px;border:1px solid #e5e5e0;border-top:none">
                <table style="width:100%;border-collapse:collapse;font-size:14px">
                  <tr><td style="padding:8px 0;color:#666;width:120px">Email</td><td style="padding:8px 0"><a href="mailto:${data.email}" style="color:#3d8c2f">${data.email}</a></td></tr>
                  <tr><td style="padding:8px 0;color:#666">Phone</td><td style="padding:8px 0"><a href="tel:${fullPhone.replace(/\s/g,'')}" style="color:#3d8c2f">${fullPhone}</a></td></tr>
                  <tr><td style="padding:8px 0;color:#666">Company</td><td style="padding:8px 0">${data.company || "—"}</td></tr>
                  <tr><td style="padding:8px 0;color:#666">Service</td><td style="padding:8px 0">${data.service}</td></tr>
                  <tr><td style="padding:8px 0;color:#666">Source</td><td style="padding:8px 0">${sourceLabel}</td></tr>
                </table>
                <div style="margin-top:20px;padding:16px;background:#fff;border:1px solid #e5e5e0;border-radius:6px">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#999">Message</p>
                  <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${data.message}</p>
                </div>
                <p style="margin:20px 0 0;font-size:11px;color:#aaa">Lead ID: ${insertedId}</p>
              </div>
            </div>
          `,
          text: [
            `New lead — ${sourceLabel}`,
            ``,
            `Name:    ${data.name}`,
            `Email:   ${data.email}`,
            `Phone:   ${fullPhone}`,
            `Company: ${data.company || "—"}`,
            `Service: ${data.service}`,
            `Source:  ${sourceLabel}`,
            ``,
            `Message:`,
            data.message,
            ``,
            `Lead ID: ${insertedId}`,
          ].join("\n"),
        });

        console.log("[submitLead] Email sent to hello@trashworks.in for lead:", insertedId);
      }
    } catch (emailErr) {
      // Email failure must never block the user — lead is already saved to DB.
      console.error("[submitLead] Email send failed:", emailErr);
    }

    return { success: true, id: insertedId };
  });
