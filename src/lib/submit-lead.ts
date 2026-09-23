import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ── Schema ────────────────────────────────────────────────────────────────────
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

// ── Server function ───────────────────────────────────────────────────────────
// Uses MongoDB Atlas Data API (REST) so it works on any runtime (Node, edge, CF Workers).
// Enable it in Atlas → App Services → Data API, then set the env vars below.
export const submitLead = createServerFn({ method: "POST" })
  .validator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const uri      = process.env["MONGODB_URI"];
    const apiKey   = process.env["MONGODB_DATA_API_KEY"];
    const appId    = process.env["MONGODB_APP_ID"];

    // ── Strategy A: Atlas Data API (preferred for edge/serverless) ───────────
    if (apiKey && appId) {
      const endpoint = `https://data.mongodb-api.com/app/${appId}/endpoint/data/v1/action/insertOne`;

      const doc = {
        name:      data.name,
        email:     data.email,
        company:   data.company,
        phone:     `${data.countryCode} ${data.phone}`.trim(),
        service:   data.service,
        message:   data.message,
        source:    data.source,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch(endpoint, {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":       apiKey,
        },
        body: JSON.stringify({
          dataSource: "Cluster0",
          database:   "thetrashco",
          collection: "leads",
          document:   doc,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`MongoDB Data API error ${res.status}: ${text}`);
      }

      return { success: true };
    }

    // ── Strategy B: Native MongoDB driver (Node.js runtime only) ─────────────
    if (uri) {
      // Dynamic import so the module isn't bundled for edge environments
      const { MongoClient, ServerApiVersion } = await import("mongodb");

      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      try {
        await client.connect();
        const db    = client.db("thetrashco");
        const leads = db.collection("leads");

        await leads.insertOne({
          name:      data.name,
          email:     data.email,
          company:   data.company,
          phone:     `${data.countryCode} ${data.phone}`.trim(),
          service:   data.service,
          message:   data.message,
          source:    data.source,
          createdAt: new Date(),
        });
      } finally {
        await client.close();
      }

      return { success: true };
    }

    throw new Error(
      "No MongoDB configuration found. Set MONGODB_URI or MONGODB_DATA_API_KEY + MONGODB_APP_ID in your environment."
    );
  });
