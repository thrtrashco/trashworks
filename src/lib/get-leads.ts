import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const AuthSchema = z.object({
  password: z.string(),
});

export const getLeads = createServerFn({ method: "POST" })
  .validator((data: unknown) => AuthSchema.parse(data))
  .handler(async ({ data }) => {
    const secret = process.env["LEADS_DASHBOARD_PASSWORD"];

    if (!secret || data.password !== secret) {
      throw new Error("Unauthorized");
    }

    const uri = process.env["MONGODB_URI"];
    if (!uri) throw new Error("MONGODB_URI is not set.");

    const { MongoClient, ServerApiVersion } = await import("mongodb");

    const client = new MongoClient(uri, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
      connectTimeoutMS: 8000,
      serverSelectionTimeoutMS: 8000,
    });

    await client.connect();

    try {
      const db = client.db("thetrashco");
      const leads = await db
        .collection("leads")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();

      return leads.map((lead) => ({
        _id:       lead._id.toString(),
        name:      lead.name as string,
        email:     lead.email as string,
        company:   (lead.company as string) ?? "",
        phone:     lead.phone as string,
        service:   lead.service as string,
        message:   lead.message as string,
        source:    lead.source as string,
        createdAt: lead.createdAt instanceof Date
          ? lead.createdAt.toISOString()
          : String(lead.createdAt),
      }));
    } finally {
      await client.close();
    }
  });
