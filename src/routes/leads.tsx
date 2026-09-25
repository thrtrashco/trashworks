import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download, Lock, LogOut, Mail, MessageSquare, Phone, RefreshCw, X } from "lucide-react";
import { getLeads } from "@/lib/get-leads";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Leads | the trash co." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LeadsPage,
});

type Lead = {
  _id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  source: string;
  createdAt: string;
};

/* ── Detail drawer ── */
function LeadDrawer({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-light-border px-6 py-4">
          <div>
            <p className="font-display text-lg font-bold">{lead.name}</p>
            <p className="text-xs text-muted-foreground">{lead.company || "No company"}</p>
          </div>
          <button
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full hover:bg-light-muted transition-colors"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Contact */}
          <div className="rounded-xl border border-light-border bg-light-muted p-4 space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Contact</p>
            <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-primary-dark hover:underline">
              <Mail className="size-4 shrink-0" />{lead.email}
            </a>
            <a href={`tel:${lead.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Phone className="size-4 shrink-0" />{lead.phone}
            </a>
          </div>

          {/* Service + Source */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-light-border bg-light-muted p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1.5">Service</p>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary-dark">
                {lead.service}
              </span>
            </div>
            <div className="rounded-xl border border-light-border bg-light-muted p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1.5">Source</p>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                lead.source === "cta_modal"
                  ? "bg-dark/10 text-foreground"
                  : "bg-light-border text-muted-foreground"
              }`}>
                {lead.source === "cta_modal" ? "CTA Modal" : "Contact Page"}
              </span>
            </div>
          </div>

          {/* Date */}
          <div className="rounded-xl border border-light-border bg-light-muted p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-1">Submitted</p>
            <p className="text-sm">
              {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                weekday: "long", day: "numeric", month: "long", year: "numeric",
              })}
            </p>
          </div>

          {/* Message */}
          <div className="rounded-xl border border-light-border bg-light-muted p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-2">Message</p>
            <p className="text-sm leading-6 whitespace-pre-wrap text-foreground">
              {lead.message || "—"}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-light-border px-6 py-4 flex gap-3">
          <Button asChild size="lg" className="flex-1 gap-2">
            <a href={`mailto:${lead.email}`}>
              <Mail className="size-4" /> Reply by email
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="gap-2">
            <a href={`tel:${lead.phone.replace(/\s/g, "")}`}>
              <Phone className="size-4" /> Call
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}

function LeadsPage() {
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  async function unlock() {
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await getLeads({ data: { password } });
      setLeads(result as Lead[]);
    } catch {
      setError("Wrong password. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function refresh() {
    if (!password) return;
    setLoading(true);
    try {
      const result = await getLeads({ data: { password } });
      setLeads(result as Lead[]);
    } catch {
      setError("Session expired. Re-enter password.");
      setLeads(null);
    } finally {
      setLoading(false);
    }
  }

  function downloadCSV() {
    if (!leads?.length) return;
    const headers = ["Name", "Email", "Company", "Phone", "Service", "Source", "Message", "Date"];
    const rows = leads.map((l) => [
      l.name, l.email, l.company, l.phone, l.service, l.source,
      `"${l.message.replace(/"/g, '""')}"`,
      new Date(l.createdAt).toLocaleDateString("en-IN"),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ── Lock screen ── */
  if (!leads) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark px-4">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <span className="grid size-14 place-items-center rounded-full border border-primary/30 bg-primary/10">
              <Lock className="size-6 text-primary" />
            </span>
            <h1 className="font-display text-2xl font-bold text-dark-foreground">Leads Dashboard</h1>
            <p className="text-sm text-dark-muted">Enter the dashboard password to continue.</p>
          </div>
          <div className="space-y-3 rounded-2xl border border-dark-foreground/15 bg-dark-foreground/[0.03] p-6">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && unlock()}
              className="border-dark-foreground/20 bg-dark-foreground/5 text-dark-foreground placeholder:text-dark-muted focus-visible:ring-primary/30"
              autoFocus
            />
            {error && <p className="text-xs text-red-400">{error}</p>}
            <Button onClick={unlock} disabled={loading} className="w-full" size="lg">
              {loading ? "Checking…" : "Unlock"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const sourceCount = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.source] = (acc[l.source] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      {/* Detail drawer */}
      {selected && <LeadDrawer lead={selected} onClose={() => setSelected(null)} />}

      <div className="min-h-screen bg-light-muted">
        {/* Dashboard header — z-41 so it sits above site nav (z-40) */}
        <header className="sticky top-0 z-[41] border-b border-light-border bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <div>
              <h1 className="font-display text-lg font-bold sm:text-xl">Leads Dashboard</h1>
              <p className="text-xs text-muted-foreground">{leads.length} total submissions</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={refresh} disabled={loading} className="gap-1.5">
                <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
              <Button variant="outline" size="sm" onClick={downloadCSV} className="gap-1.5">
                <Download className="size-3.5" />
                <span className="hidden sm:inline">CSV</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => { setLeads(null); setPassword(""); }} className="gap-1.5">
                <LogOut className="size-3.5" />
                <span className="hidden sm:inline">Lock</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          {/* Stat cards */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Total leads", value: leads.length },
              { label: "Contact page", value: sourceCount["contact_page"] ?? 0 },
              { label: "CTA modal", value: sourceCount["cta_modal"] ?? 0 },
              { label: "Today", value: leads.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-light-border bg-background p-4">
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          {leads.length === 0 ? (
            <div className="rounded-2xl border border-light-border bg-background p-16 text-center">
              <p className="text-muted-foreground">No leads yet.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-light-border bg-background">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-light-border bg-light-muted">
                      {["Name", "Email", "Phone", "Service", "Source", "Date", ""].map((h, i) => (
                        <th key={i} className="px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead, i) => (
                      <tr
                        key={lead._id}
                        className={`border-b border-light-border transition-colors hover:bg-light-muted cursor-pointer ${i % 2 === 0 ? "" : "bg-light-muted/40"}`}
                        onClick={() => setSelected(lead)}
                      >
                        <td className="px-4 py-3 font-medium">
                          <p>{lead.name}</p>
                          {lead.company && <p className="text-xs text-muted-foreground">{lead.company}</p>}
                        </td>
                        <td className="px-4 py-3">
                          <a
                            href={`mailto:${lead.email}`}
                            onClick={e => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-primary-dark hover:underline"
                          >
                            <Mail className="size-3.5 shrink-0" />{lead.email}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{lead.phone}</td>
                        <td className="px-4 py-3">
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary-dark whitespace-nowrap">
                            {lead.service}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${
                            lead.source === "cta_modal" ? "bg-dark/10 text-foreground" : "bg-light-border text-muted-foreground"
                          }`}>
                            {lead.source === "cta_modal" ? "CTA Modal" : "Contact Page"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                            <MessageSquare className="size-3.5" />
                            <span className="hidden sm:inline">View</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
