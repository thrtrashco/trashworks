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

    if (!uri) {
      throw new Error("MONGODB_URI is not set in environment variables.");
    }

    const { MongoClient, ServerApiVersion } = await import("mongodb");

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
      // Fail fast — don't hang for 30s if Atlas is unreachable
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

      console.log("[submitLead] Inserted:", result.insertedId.toString());
      return { success: true, id: result.insertedId.toString() };
    } finally {
      await client.close();
    }
  });
