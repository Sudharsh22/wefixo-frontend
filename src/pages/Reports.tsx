import { BarChart3, FileDown, Package, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Sidebar from "../components/sidebar/Sidebar";
import PageHeader from "../components/ui/PageHeader";
import SectionCard from "../components/ui/SectionCard";
import StatCard from "../components/ui/StatCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type KPI = {
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  tone: "red" | "emerald" | "amber" | "cyan";
};

type ReportRow = {
  name: string;
  type: string;
  generated: string;
  owner: string;
  status: "Ready" | "Processing" | "Archived";
};

const kpiData: KPI[] = [
  {
    title: "Total Reports",
    value: "24",
    subtitle: "active and scheduled",
    icon: BarChart3,
    tone: "cyan",
  },
  {
    title: "Production Reports",
    value: "8",
    subtitle: "daily and shift-based",
    icon: BarChart3,
    tone: "emerald",
  },
  {
    title: "Inventory Reports",
    value: "7",
    subtitle: "warehouse and stock review",
    icon: Package,
    tone: "amber",
  },
  {
    title: "Maintenance Reports",
    value: "9",
    subtitle: "asset and downtime analysis",
    icon: Wrench,
    tone: "red",
  },
];

const reportHistory: ReportRow[] = [
  {
    name: "Shift Production Summary",
    type: "Production",
    generated: "08:30 AM",
    owner: "Ops Team",
    status: "Ready",
  },
  {
    name: "Warehouse Stock Review",
    type: "Inventory",
    generated: "07:45 AM",
    owner: "Supply Chain",
    status: "Processing",
  },
  {
    name: "Downtime Analysis",
    type: "Maintenance",
    generated: "Yesterday",
    owner: "Reliability",
    status: "Archived",
  },
];

const statusStyles = {
  Ready: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  Processing: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  Archived: "border-slate-500/20 bg-slate-500/10 text-slate-300",
};

export default function ReportsPage() {
  const handleDownloadPDF = (reportType: string) => {
    const doc = new jsPDF();
    
    // Add Coca-Cola Red Branding
    doc.setFillColor(255, 26, 26);
    doc.rect(0, 0, 210, 20, "F");
    
    // Header
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("WEFIXO SMART FACTORY AI", 14, 13);
    
    // Report Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.text(`${reportType} Report`, 14, 35);
    
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 42);
    
    // Dummy Data based on Report Type
    let head = [["Metric", "Value", "Status"]];
    let body: any[] = [];
    
    if (reportType === "Production") {
      body = [
        ["Total Volume (Shift)", "14,200 Cases", "On Target"],
        ["Line Efficiency (OEE)", "92.4%", "Excellent"],
        ["Defect Rate", "0.08%", "Within limits"],
        ["Active Lines", "7 / 8", "Warning: 1 Down"]
      ];
    } else if (reportType === "Inventory") {
      body = [
        ["Raw Materials (Syrup)", "84,000 L", "Healthy"],
        ["Packaging (Bottles)", "120,000 Units", "Healthy"],
        ["Labels", "15,000 Units", "Critical: Reorder"],
        ["CO2 Tanks", "4 Tanks", "Warning"]
      ];
    } else if (reportType === "Maintenance") {
      body = [
        ["Active Alerts", "4", "Action Required"],
        ["Resolved Today", "12", "Completed"],
        ["Mean Time to Repair", "14 mins", "Excellent"],
        ["Upcoming Scheduled", "Filler A1 Maintenance", "Tomorrow"]
      ];
    }

    autoTable(doc, {
      startY: 50,
      head: head,
      body: body,
      theme: 'grid',
      headStyles: { fillColor: [255, 26, 26] },
      styles: { fontSize: 11, cellPadding: 5 },
    });

    // Save the PDF
    doc.save(`${reportType}_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden flex-col md:flex-row bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.22),transparent_35%),linear-gradient(135deg,#020617_0%,#0f172a_100%)] text-white font-sans">
      <Sidebar />

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 space-y-6">
        <PageHeader
          eyebrow="Enterprise reporting"
          title="Reports"
          description="Generate, review, and export operational intelligence across the smart factory."
          badge="Daily report generation is running on schedule"
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpiData.map((card) => (
            <StatCard key={card.title} {...card} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <SectionCard eyebrow="Operations" title="Production Report" badge="Updated today">
            <p className="text-sm text-slate-400">
              Bottling throughput, line efficiency, and production volume snapshot for the current shift.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => handleDownloadPDF("Production")} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-slate-200 transition hover:border-red-400/30 hover:text-white cursor-pointer">
                <FileDown className="h-4 w-4" />
                PDF
              </button>
              {(["Excel", "CSV"] as const).map((format) => (
                <button key={format} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-slate-200 transition hover:border-red-400/30 hover:text-white cursor-not-allowed opacity-50">
                  <FileDown className="h-4 w-4" />
                  {format}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard eyebrow="Supply chain" title="Inventory Report" badge="Needs review">
            <p className="text-sm text-slate-400">
              Stock availability, reserved inventory, and reorder risk across critical materials.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => handleDownloadPDF("Inventory")} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-slate-200 transition hover:border-red-400/30 hover:text-white cursor-pointer">
                <FileDown className="h-4 w-4" />
                PDF
              </button>
              {(["Excel", "CSV"] as const).map((format) => (
                <button key={format} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-slate-200 transition hover:border-red-400/30 hover:text-white cursor-not-allowed opacity-50">
                  <FileDown className="h-4 w-4" />
                  {format}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard eyebrow="Reliability" title="Maintenance Report" badge="4 flagged items">
            <p className="text-sm text-slate-400">
              Maintenance workload, downtime trends, and unresolved service issues for the week.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={() => handleDownloadPDF("Maintenance")} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-slate-200 transition hover:border-red-400/30 hover:text-white cursor-pointer">
                <FileDown className="h-4 w-4" />
                PDF
              </button>
              {(["Excel", "CSV"] as const).map((format) => (
                <button key={format} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-800/70 px-3 py-2 text-sm text-slate-200 transition hover:border-red-400/30 hover:text-white cursor-not-allowed opacity-50">
                  <FileDown className="h-4 w-4" />
                  {format}
                </button>
              ))}
            </div>
          </SectionCard>
        </div>

        <SectionCard eyebrow="Archive" title="Report History" badge="Latest exports available">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead>
                <tr className="border-b border-white/10 text-slate-400">
                  <th className="px-3 py-3 font-medium">Report Name</th>
                  <th className="px-3 py-3 font-medium">Type</th>
                  <th className="px-3 py-3 font-medium">Generated</th>
                  <th className="px-3 py-3 font-medium">Owner</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {reportHistory.map((row) => (
                  <tr key={row.name} className="border-b border-white/10 last:border-none">
                    <td className="px-3 py-3 text-white">{row.name}</td>
                    <td className="px-3 py-3">{row.type}</td>
                    <td className="px-3 py-3">{row.generated}</td>
                    <td className="px-3 py-3">{row.owner}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </main>
    </div>
  );
}
