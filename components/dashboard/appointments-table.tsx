"use client";

import { useMemo, useState, useTransition } from "react";
import { Search, Download, Trash2, Printer } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AppointmentStatusBadge } from "@/components/dashboard/appointment-status-badge";
import {
  updateAppointmentStatus,
  deleteAppointment,
} from "@/lib/actions/appointments-admin";
import type { AppointmentStatus } from "@prisma/client";

interface AppointmentRow {
  id: string;
  patientName: string;
  phone: string;
  email: string;
  preferredDate: Date;
  preferredTime: string;
  status: AppointmentStatus;
  paymentMethod: string;
  service: { titleFr: string };
}

const STATUS_OPTIONS: { value: AppointmentStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "Tous les statuts" },
  { value: "PENDING", label: "En attente" },
  { value: "CONFIRMED", label: "Confirmé" },
  { value: "COMPLETED", label: "Terminé" },
  { value: "CANCELLED", label: "Annulé" },
];

export function AppointmentsTable({ appointments }: { appointments: AppointmentRow[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<AppointmentStatus | "ALL">("ALL");
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;
      const q = search.toLowerCase();
      const matchesSearch =
        search === "" ||
        a.patientName.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        a.email.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [appointments, search, statusFilter]);

  function handleStatusChange(id: string, status: AppointmentStatus) {
    startTransition(async () => {
      const result = await updateAppointmentStatus(id, status);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Confirmer la suppression de ce rendez-vous ?")) return;
    startTransition(async () => {
      const result = await deleteAppointment(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  function exportCsv() {
    const header = ["Nom", "Téléphone", "Email", "Service", "Date", "Heure", "Statut", "Paiement"];
    const rows = filtered.map((a) => [
      a.patientName,
      a.phone,
      a.email,
      a.service.titleFr,
      new Date(a.preferredDate).toLocaleDateString("fr-FR"),
      a.preferredTime,
      a.status,
      a.paymentMethod,
    ]);
    const csv = [header, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rendez-vous-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-2xl border border-border bg-card shadow-premium">
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher (nom, tél, email)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as AppointmentStatus | "ALL")}
          >
            <SelectTrigger className="w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={exportCsv}>
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4" />
            Imprimer
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
              <th className="px-5 py-3 font-heading font-medium">Patient</th>
              <th className="px-5 py-3 font-heading font-medium">Contact</th>
              <th className="px-5 py-3 font-heading font-medium">Service</th>
              <th className="px-5 py-3 font-heading font-medium">Date & heure</th>
              <th className="px-5 py-3 font-heading font-medium">Paiement</th>
              <th className="px-5 py-3 font-heading font-medium">Statut</th>
              <th className="px-5 py-3 font-heading font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground">
                  Aucun rendez-vous trouvé.
                </td>
              </tr>
            ) : (
              filtered.map((a) => (
                <tr key={a.id} className="transition-colors hover:bg-secondary/40">
                  <td className="px-5 py-4 font-heading font-medium text-primary-950 dark:text-white">
                    {a.patientName}
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">
                    <div>{a.phone}</div>
                    <div className="text-xs">{a.email}</div>
                  </td>
                  <td className="px-5 py-4">{a.service.titleFr}</td>
                  <td className="px-5 py-4">
                    <div>{new Date(a.preferredDate).toLocaleDateString("fr-FR")}</div>
                    <div className="text-xs text-muted-foreground">{a.preferredTime}</div>
                  </td>
                  <td className="px-5 py-4 text-xs">
                    {a.paymentMethod === "ORANGE_MONEY" ? "Orange Money" : "Sur place"}
                  </td>
                  <td className="px-5 py-4">
                    <Select
                      value={a.status}
                      onValueChange={(v) => handleStatusChange(a.id, v as AppointmentStatus)}
                      disabled={isPending}
                    >
                      <SelectTrigger className="h-8 w-36 text-xs">
                        <SelectValue>
                          <AppointmentStatusBadge status={a.status} />
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PENDING">En attente</SelectItem>
                        <SelectItem value="CONFIRMED">Confirmé</SelectItem>
                        <SelectItem value="COMPLETED">Terminé</SelectItem>
                        <SelectItem value="CANCELLED">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(a.id)}
                      className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
